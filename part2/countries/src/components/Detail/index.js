import React from 'react'

const Detail = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital && `capital ${country.capital[0]}`}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {
          Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.flag} />
    </div>
  )
}

export default Detail