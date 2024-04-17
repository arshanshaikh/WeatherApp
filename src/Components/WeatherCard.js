// WeatherCard.js
import React, { useState, useEffect } from 'react';
import WeatherService from './WeatherService';


function WeatherCard({ city, onDelete }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cachedData = localStorage.getItem(city);
        if (cachedData) {
          setWeatherData(JSON.parse(cachedData));
        } else {
          const data = await WeatherService.getWeather(city);
          setWeatherData(data);
          localStorage.setItem(city, JSON.stringify(data));
        }
        setError(null);
      } catch (error) {
        setError('Failed to fetch weather data, City not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const handleDelete = () => {
    onDelete(city);
    localStorage.removeItem(city);
  };

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;

