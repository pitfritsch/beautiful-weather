import { useCallback } from "react"
import { apiOpenWeatherMap } from "../service/api"

export interface IReturn {
  coord: {
    lon: number
    lat: number
  },
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  },
  visibility: number
  wind: {
    speed: number
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  },
  timezone: number
  id: number
  name: string
  cod: number
}

export default function useWeather() {

  const getWeatherByCityName = useCallback(async ( cityName: string, apiKey: string ) => {
    try {
      const resp = await apiOpenWeatherMap.get(`?q=${cityName}&appid=${apiKey}&units=metric`)
      return resp.data as IReturn
    } catch (e) {
      throw e
    }
  }, [])

  return {
    getWeatherByCityName
  }
}