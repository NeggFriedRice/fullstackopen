import { useState } from 'react'
import Input from './components/Input'
import DisplayData from './components/DisplayData'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState("")
  const [filtered, setFiltered] = useState([])

  const getPersons = () => {

    // axios
    // .get('http://localhost:3001/persons')
    // .then(response => {
    //   console.log(response.data)
    //   setPersons(response.data)
    // })
    // Above code replaced with personService from persons.js

    personService.getAll()
    .then(listOfPersons => setPersons(listOfPersons))
  }

  useEffect(() => {
    getPersons()
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
      // Pre-2.12 exercise
      // setPersons(persons.concat({name: newName, number: newNumber}))

      // We want to add a new person and their number to the web server

      // First create the person object
      const newEntry = {
        name: newName,
        number: newNumber
      }
      // axios
      //   .post('http://localhost:3001/persons', newEntry)
      //   .then(response => {
      //     console.log(response.data)
      //     setPersons(persons.concat(response.data))
      //   })
      // Above code replaced by personService.js
      personService.addPerson(newEntry)
        .then(response => {
          console.log("Person added")
          setPersons(persons.concat(response))
        })
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

  const deletePerson = (id) => {
    console.log(id)
    personService.deletePerson(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter((person) => person.id !== id))
      })
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchPerson={handleSearchPerson} searchPerson={searchPerson}/>
      <PersonForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <DisplayData 
      searchPerson={searchPerson} 
      persons={persons} 
      filtered={filtered}
      deletePerson={deletePerson}
      />      
    </div>
  )
}

export default App