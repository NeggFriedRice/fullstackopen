import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState("")
  const [filtered, setFiltered] = useState("")

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const nameExists = persons.some((person) => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already in the phonebook`)
      setNewName("")
      return
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchPerson = (event) => {
    console.log(event.target.value)
    setSearchPerson(event.target.value)

    // Filter function
    const filterItems = persons.filter((person) => person.name.includes(event.target.value))

    setFiltered(filterItems)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with a<input onChange={handleSearchPerson} value={searchPerson} /></div>
      <form onSubmit={handleSubmit}>
        <h1>Add new</h1>
        <div>
          name: <input onChange={handleInputChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value ={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      {searchPerson.length > 0 
      ? filtered.map((person) => <p>{person.name} {person.number}</p>)
      : persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
      }
      
    </div>
  )
}

export default App