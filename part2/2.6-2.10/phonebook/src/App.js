import { useState } from 'react'

const Person = ({ name, number }) => <div>{name} {number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person name={person.name} number={person.number} key={person.name} />)}
    </div>
  )
}

export default App