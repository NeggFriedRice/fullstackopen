import Note from "./components/Note";
import axios from "axios";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import loginServices from "./services/login";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({
        username,
        password,
      });
      noteService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Toggle notes. If showAll is TRUE, show notes, else filter notes if the note's attribute 'important' is TRUE
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    // getNotes()
    // getNotes is now replaced with services from notes.js
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    // Point to the note in the server using it's id
    const url = `http://localhost:3001/notes/${id}`;
    // Find the note in the notes state (so we can change it)
    const note = notes.find((note) => note.id === id);
    // Create a new copy of the note object hence the '{}' by copying the attributes '...notes', and for the attribute 'important' we want to flip it '!note.important' since it's a bool
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `The note '${note.content}' was already deleted from the server`
        );
        // alert(`The note ${note.content} was already deleted from the server`)
      });
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input onChange={handleNoteChange} value={newNote} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name}</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important notes" : "all notes"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
