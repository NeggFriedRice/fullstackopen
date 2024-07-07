import mongoose from 'mongoose'

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack.ihfq0uq.mongodb.net/?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv[3] === 'find') {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
}
