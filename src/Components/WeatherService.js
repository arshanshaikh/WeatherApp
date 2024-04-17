// WeatherService.js
import axios from 'axios';

const WeatherService = {
  async getWeather(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1ca4c614e992e93d90557a646c210f57`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default WeatherService;
