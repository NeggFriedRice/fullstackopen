import { useState } from 'react'
import Input from './components/Input'
import DisplayData from './components/DisplayData'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState("")
  const [filtered, setFiltered] = useState(persons)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

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
    const filterItems = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filtered)
    setFiltered(filterItems)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchPerson={handleSearchPerson} searchPerson={searchPerson}/>
      <PersonForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <DisplayData filtered={filtered}/>      
    </div>
  )
}

export default App