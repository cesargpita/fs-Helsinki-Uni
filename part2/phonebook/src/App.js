import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons.data))
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilterName(event.target.value)

  const handleDelete = (id) => personsService.deleteName(id).then(() => setPersons([...persons.filter(_ => _.id !== id)]))

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
  }


  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    const newVal = { name: newName, number: newNumber };
    if (existingPerson) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
        personsService.updateName(existingPerson.id, newVal).then(response => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : response));
          resetFields();
        })
    } else {
      personsService.addName(newVal).then(updated => {
        setPersons(persons.concat(updated));
        showMessage(`Added ${updated.name}`, 3000);
        resetFields();
      });
    }
  }

  const showMessage = (message, time = 5000) => {
    setMessage(
      message
    )
    setTimeout(() => {
      setMessage(null)
    }, time)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
    </div>
  )
}


export default App