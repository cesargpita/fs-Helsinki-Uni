import { PropTypes } from 'prop-types'
import { React } from 'react'

const Person = ({ person, handleDelete }) => {
  const { name, number, id } = person
  return <div>{name} {number} <button onClick={() => window.confirm(`Delete ${name}?`) && handleDelete(id)}>delete</button></div>
}

Person.propTypes = {
  person: PropTypes.any,
  handleDelete: PropTypes.any
}
export default Person