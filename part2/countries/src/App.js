import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Detail from './components/Detail';

const App = () => {

  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (name) {
      axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(results => {
          setResults(results.data)
        })
        .catch(err => setResults([]))
    }
    return () => {
    };
  }, [name]);

  const handleSearch = (event) => {
    setName(event.target.value);
  }
  console.log(results.length)
  return (
    <div>
      Find countries: <input value={name} onChange={handleSearch} />
      {
        (name) ?
          (results.length > 10) ?
            <p>Too many matches, specify another filter</p> :
            (results.length === 0) ?
              <p>No results found for that text</p> :
              (results.length === 1) ?
                <Detail country={results[0]} /> : <ul>{results.map(result => <li key={result.name.common}>{result.name.common}</li>)}</ul> : <></>
      }
    </div>
  )
}

export default App