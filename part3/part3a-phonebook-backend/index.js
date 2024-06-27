const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// GET request info page
app.get('/info', (request, response) => {
    Person.find({})
        .then(persons => {
            const now = Date()
            response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p>`)
        })
})

// GET request single person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => response.json(person))
        .catch(error => next(error))
})

// Delete request single person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(200).end())
        .catch(error => next(error))
})

// Add a new person
app.post('/api/persons', (request, response, next) => {

    
    const body = request.body

    if (!body) {
        response.status(400).json({
            message: "Content missing"
        })
    }

    // Exercise 3.16
    Person.findOne({name: body.name})
        .then(existingPerson => {
            if (existingPerson) {
                const updatedPerson = {
                    name: existingPerson.name,
                    number: body.number
                }

                Person.findByIdAndUpdate(existingPerson._id, updatedPerson, {new: true})
                    .then(updatedPerson => {
                        response.json(updatedPerson)
                    })
                    .catch(error => next(error))
            } else {
                const newPerson = new Person({
                    name: body.name,
                    number: body.number
                })
                newPerson.save()
                    .then(savedPerson => response.json(savedPerson))
                    .catch(error => next(error))
                
            }
        })



    // person.save().then(person => response.json(person))


})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted ID'})
    }
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(400).json({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})