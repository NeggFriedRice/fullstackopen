import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

// GET request
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

// POST request
const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then((response) => response.data)
}

// PUT request
const updatePerson = (id, updateObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updateObject)
    return request.then(response => response.data)
}

// DELETE request
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
} 

export default { getAll, addPerson, updatePerson, deletePerson }