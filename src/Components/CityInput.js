// CityInput.js
import React, { useState, useEffect } from 'react';


function CityInput({ onAddCity }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  let debounceTimer;

  useEffect(() => {
    if (inputValue.length > 0) {
      debounceTimer = setTimeout(() => fetchCities(), 5000);
    } else {
      setSuggestions([]);
      setError(null);
    }

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&mode=json&appid=1ca4c614e992e93d90557a646c210f57`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setSuggestions(data.list.map((city) => city.name));
      setError(null);
    } catch (error) {
      setError('City not found');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddCity = () => {
    if (inputValue.trim() !== '' && error === null) {
      onAddCity(inputValue.trim());
      setInputValue('');
      setSuggestions([]);
    }
  };

  return (
    <div className="city-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter city name..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => setInputValue(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error-message">City not found</p>}
      <button onClick={handleAddCity}>Add City</button>
    </div>
  );
}

export default CityInput;
