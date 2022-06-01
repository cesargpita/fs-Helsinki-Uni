import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Weather from '../Weather';

const Detail = ({ country }) => {

  const API_KEY = process.env.REACT_APP_API_KEY
  const [lat, lon] = country?.capitalInfo?.latlng || [null, null];

  const [weather, setWeather] = useState({ weather: [{ icon: null }] });

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(data => {
        setWeather(data?.data)
      })
    return () => {
    };
  }, []);
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
      <Weather data={weather} capital={country?.capital[0]} />
    </div>
  )
}

export default Detail