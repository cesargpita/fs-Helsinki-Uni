const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.jtzgn.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (!name || !number) {
      return Person.find({}).then(res => {
        console.log('Phonebook:')
        res.forEach(person => console.log(person.name, person.number))
        return mongoose.connection.close()
      })
    } else {
      const person = new Person({
        name,
        number
      })

      return person.save()
        .then(() => {
          console.log('note saved!')
          return mongoose.connection.close()
        })
    }

  })
  .catch((err) => console.log(err))