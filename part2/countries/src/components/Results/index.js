import React from 'react'

const Results = ({ results }) => {
  return (results.lenth > 10) ? <p>Too many matches, specify another filter</p> :
    (results.length === 1) ? <h1>Uno</h1> : <ul>{results.map(result => <li key={result.name.common}>{result.name.common}</li>)}</ul>
}

export default Results