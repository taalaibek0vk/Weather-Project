import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState({})
  const [location, setlocation] = useState("")
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=eaf46ef8440456aee22e9ef95537469b`

  const searchLocation = (event) => {
  if (event.key === "Enter") {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data);
    })
    setlocation("")
    console.log(data);
  }
}
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setlocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Введите город"
          type="text">
        </input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="location_name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold"> Ощущается как: {data.main.feels_like.toFixed()}°C</p>
              ) : null}
            </div>
            <div className="humidity">
              {data.main ? <p className="bold"> Влажность: {data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              {data.wind ? <p className="bold"> Скорость ветра: {data.wind.speed}м/c</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}