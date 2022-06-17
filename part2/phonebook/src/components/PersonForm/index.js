import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  addName: PropTypes.any,
  newName: PropTypes.string,
  handleNameChange: PropTypes.any,
  newNumber: PropTypes.string,
  handleNumberChange: PropTypes.any
}

export default PersonForm