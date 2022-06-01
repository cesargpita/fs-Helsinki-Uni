import React from 'react'

const Weather = ({ data, capital }) => {
  console.log(data)

  const { weather, wind, main } = data;
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature: {main?.temp / 10} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`} />
      <p>wind: {wind?.speed} m/s</p>
    </div>
  )
}

export default Weather