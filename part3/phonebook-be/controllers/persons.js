const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('', (request, response) => {
  Person.find({}).then(persons =>
    response.json(persons))
})
personsRouter.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for people</p>
    <p>${new Date()}</p>  
  `)
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('', (request, response, next) => {
  const body = request.body
  console.log(body)

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number are required fields'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then((savedPerson) => {
      console.log('person saved!')
      response.json(savedPerson)
    }).catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter