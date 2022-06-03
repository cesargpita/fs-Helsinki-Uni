import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons.data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilterName(event.target.value)


  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      //setPersons(persons.concat({ name: newName, number: newNumber }))
      personsService.addName({ name: newName, number: newNumber }).then(updated => setPersons(persons.concat(updated)))
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  )
}


export default App