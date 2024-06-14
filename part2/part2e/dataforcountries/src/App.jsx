import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filtered, setFiltered] = useState([])

  const getData = () => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
    const filterCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log(filterCountries)
    setFiltered(filterCountries)
  }

  console.log("Filtered", filtered)

  return (
    <>
    <div>find countries<input onChange={handleSearch} value={searchTerm}></input></div>
    <ul>
      {filtered.length > 10
      ? <p>Too many matches, make your filter more specific</p>
      : filtered.map((country) => {return <li key={country.name.common}>{country.name.common}</li>})}
    </ul>
    </>
  )
}

export default App
