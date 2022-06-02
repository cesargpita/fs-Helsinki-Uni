import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Weather = ({ capital }) => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [weatherInfo, setWeatherInfo] = useState();
  const [temp, setTemp] = useState();
  const [windSpeed, setWindSpeed] = useState();

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
      .then(data => {
        const { weather, wind, main } = data.data;
        setWeatherInfo(weather[0]);
        setTemp(main.temp / 10);
        setWindSpeed(wind.speed);
      })
    return () => {
    };
  }, [capital, API_KEY]);
  return (
    <div>
      <h2>Weather in {capital}</h2>
      {temp && weatherInfo && windSpeed && <>
        <p>temperature: {temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt={weatherInfo.description} />
        <p>wind: {windSpeed} m/s</p>
      </>}
    </div>
  )
}

export default Weather