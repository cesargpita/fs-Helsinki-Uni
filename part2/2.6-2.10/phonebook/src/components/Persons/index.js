import React from 'react'
import Person from '../Person'

const Persons = ({ persons, filterName }) => persons.filter(person => filterName ? person.name.toLowerCase().includes(filterName.toLowerCase()) : true).map(person => <Person name={person.name} number={person.number} key={person.name} />)

export default Persons