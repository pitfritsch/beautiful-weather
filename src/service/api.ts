import axios from "axios";

const apiOpenWeatherMap = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather'
})

export { apiOpenWeatherMap }