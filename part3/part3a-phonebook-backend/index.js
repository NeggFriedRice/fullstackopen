const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

const logFormat = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(morgan(logFormat))
app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method)
    console.log("Path:", request.path)
    console.log("Body:", request.body)
    console.log("---")
    next()
}

app.use(requestLogger)


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET request info page
app.get('/info', (request, response) => {
    const now = Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`
    )
})

// GET request single person
app.get('/api/persons/:id', (request, response) => {
    // Need to convert param to Number
    const id = Number(request.params.id)
    const selectedPerson = persons.find(person => person.id === id)

    if (!selectedPerson) {
        return response.send(404).end()
    }

    console.log(selectedPerson)
    response.json(selectedPerson)
})

// Delete request single person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const selectedPerson = persons.find(person => person.id === id)

    if (!selectedPerson) {
        return response.status(404).end()
    }

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// Add a new person
app.post('/api/persons', (request, response) => {
    // Get the body from the request, make sure express.json() is added
    const body = request.body

    console.log(body.name)

    const duplicateName = persons.find(person => person.name === body.name)


    // Check there is content in the body of the request
    if (!body.name || !body.number ) {
        return response.status(400).json({
            error: "No content in request"
        })
    } else if (duplicateName) {
        return response.status(400).json({
            error: "Name must be unique"
        })
    }

    // Create new note object
    const newPerson = {
        name: body.name,
        number: body.number,
        id: persons.length + 1
    }

    // Add new person to the existing array
    persons = persons.concat(newPerson)

    // Send response with status and message
    response.status(201).json({
        message: "New person added"
    })


})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})