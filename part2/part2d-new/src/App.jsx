import Note from './components/Note'
import axios from 'axios'
import { useState, useEffect } from 'react'
import noteService from './services/notes'


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  // const getNotes = () => {
  //   console.log('effect')
  //   axios
  //   .get('http://localhost:3001/notes')
  //   .then(response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
      
  //   })
  // }

  // Toggle notes. If showAll is TRUE, show notes, else filter notes if the note's attribute 'important' is TRUE
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    // getNotes()
    // getNotes is now replaced with services from notes.js
    noteService.getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    
    // part2d - Sending data to the Server
    // axios
    // .post('http://localhost:3001/notes', noteObject)
    // .then(response => {
    //   setNotes(notes.concat(response.data))
    //   setNewNote("")
    // })
    // Replace above function with service from notes.js
    noteService.create(noteObject)
      .then((response) => {
        setNotes(notes.concat(response.data))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    // Point to the note in the server using it's id
    const url = `http://localhost:3001/notes/${id}`
    // Find the note in the notes state (so we can change it)
    const note = notes.find(note => note.id === id)
    // Create a new copy of the note object hence the '{}' by copying the attributes '...notes', and for the attribute 'important' we want to flip it '!note.important' since it's a bool
    const changedNote = { ...note, important: !note.important}

    // // Send the put request to the server
    // axios
    // .put(url, changedNote)
    // .then(response => {
    //   // Update the notes state with the new values that have come from the server
    //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    // })
    // Replace above function with service from notes.js
    noteService.update(id, changedNote)
      .then((response) => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important notes' : 'all notes'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
        <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App