import React from 'react'
import Person from '../Person'

const Persons = ({ persons, filterName, handleDelete }) => persons.filter(person => filterName ? person.name.toLowerCase().includes(filterName.toLowerCase()) : true).map(person => <Person person={person} key={person.id} handleDelete={handleDelete} />)

export default Persons