import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isReady, setReady] = useState(false);
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Temperature, setTemperature] = useState("");
  const [Description, setDescription] = useState("");
  const [Sunrise, setSunrise] = useState("");
  const [Sunset, setSunset] = useState("");

  var Convert_sunrise = new Date(Sunrise*1000);
  //console.log(Convert_sunrise.toLocaleString());

  var Convert_sunset = new Date(Sunset*1000);
  //console.log(Convert_sunset.toLocaleString());

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=" + process.env.REACT_APP_API_KEY)
    .then(response => response.json())
    .then(data => {
      setReady(true);
      setCity(data.name);
      setCountry(data.sys.country)
      setTemperature(data.main.temp)
      setDescription(data.weather[0].description)
      setSunrise(data.sys.sunrise)
      setSunset(data.sys.sunset)
    })
    .catch(err => console.log(err))
  }, [])

  if (!isReady)
    return <div className="loading">Loading...</div>

  return (
    <div className="App">
      <h1>Current Weather</h1>
      <p>Powered by: openweathermap.org</p>
      <div>
      <table className="Table">
        <tbody>
          <tr>
            <th>{City}, {Country}</th>
          </tr>
          <tr>
            <td>Temp: {Temperature} °C</td>
          </tr>
          <tr>
            <td>Description: {Description}</td>
          </tr>
          <tr>
            <td>Sunrise: {(Convert_sunrise.getHours() < 10 ? '0' : '') + Convert_sunrise.getHours()}:{(Convert_sunrise.getMinutes() < 10 ? '0' : '') + Convert_sunrise.getMinutes()}</td>
          </tr>
          <tr>
            <td>Sunset: {(Convert_sunset.getHours() < 10 ? '0' : '') + Convert_sunset.getHours()}:{(Convert_sunset.getMinutes() < 10 ? '0' : '') + Convert_sunset.getMinutes()}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <p>Made by Marwan Al-Obaidi</p>
    </div>
  );
}

export default App;
