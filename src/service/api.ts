import axios from "axios";

const apiOpenWeatherMap = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/weather'
})

export { apiOpenWeatherMap }