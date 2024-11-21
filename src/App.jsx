import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'

const App = () => {
const key = "26f27e392af347a9bba63f2e074f0804"
const toCoordinates = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}"
const getWeather = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"


let locationRef = useRef();
const [weather, setWeather] = useState(null)
const [newCoordinates, setNewCoordinates] = useState({})

async function getCoordinates() {
  try{
    const coordinate = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${locationRef.current.value}&limit=5&appid=26f27e392af347a9bba63f2e074f0804`)
    
    let coordinates = {
      lat: coordinate.data[0].lat,
      lon:coordinate.data[0].lon
    }

    setNewCoordinates(coordinates)
    return coordinates
    
  }catch(error){
    console.log(error)
  }
}

async function getWeatherInfo(newCoordinates){
  const {lon,lat} = newCoordinates
 
  try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
   
    setWeather({
      humidity:res.data.main.humidity,
  temp:res.data.main.temp,
  desc:res.data.weather[0].description
    })


    return res

  } catch (error) {
    console.log(error)
  }
}

const onSearch = async () => {
  
  const coordinates = await getCoordinates();
  await getWeatherInfo(coordinates)

  
}


  return (
    <div>
      <h1>Weather App</h1>
      <input ref={locationRef}></input>
      <button onClick={onSearch}>Search</button>
      <p>{weather ? "Find details below":"Search a location"}</p>
      {weather && (<>
        <p>Humidity: {weather.humidity}</p>
        <p>Temperature: {weather.temp}</p>
        <p>can be described as: {weather.desc}</p>
      </>
        
    )}
    </div>
  )
}

export default App

