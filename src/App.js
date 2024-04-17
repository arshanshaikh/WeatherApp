// App.js
import React, { useState } from 'react';
import './App.css';
import CityInput from './Components/CityInput';
import WeatherCard from './Components/WeatherCard';

function App() {
  const [cities, setCities] = useState([]);

  const addCity = (city) => {
    setCities([...cities, city]);
  };

  const deleteCity = (city) => {
    const filteredCities = cities.filter((c) => c !== city);
    setCities(filteredCities);
  };
  
  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <CityInput onAddCity={addCity} />
      <div className="weather-cards">
        {cities.map((city, index) => (
          <WeatherCard key={index} city={city} onDelete={deleteCity}/>
        ))}
      </div>
    </div>
  );
}

export default App;
