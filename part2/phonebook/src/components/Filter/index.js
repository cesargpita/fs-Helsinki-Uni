import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input
        value={filterName}
        onChange={handleFilterChange} />
    </div>
  )
}

Filter.propTypes = {
  filterName: PropTypes.string,
  handleFilterChange: PropTypes.any
}

export default Filter