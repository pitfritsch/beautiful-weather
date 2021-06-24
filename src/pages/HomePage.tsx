import React, { useCallback, useMemo } from 'react'
import { WiCloud, WiCloudy, WiDayCloudy, WiDayShowers, WiDaySunny, WiNightClear, WiNightCloudy, WiNightShowers, WiRainMix, WiSnow, WiThunderstorm } from "react-icons/wi";
import { MdPlace } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import useWeather, { IReturn } from '../hooks/useWeather';
import styled from '@emotion/styled';
import { Box, Flex, Input } from '@chakra-ui/react';
import { css } from '@emotion/react';


const weatherToIcon: {
  iconName: string;
  icon: JSX.Element;
}[] = [
  { iconName: "01d", icon: <WiDaySunny /> },
  { iconName: "02d", icon: <WiDayCloudy /> },
  { iconName: "03d", icon: <WiCloud /> },
  { iconName: "04d", icon: <WiCloudy /> },
  { iconName: "09d", icon: <WiRainMix /> },
  { iconName: "10d", icon: <WiDayShowers /> },
  { iconName: "11d", icon: <WiThunderstorm /> },
  { iconName: "13d", icon: <WiSnow /> },
  { iconName: "50d", icon: <WiDaySunny /> },
  
  { iconName: "01n", icon: <WiNightClear /> },
  { iconName: "02n", icon: <WiNightCloudy /> },
  { iconName: "03n", icon: <WiCloud /> },
  { iconName: "04n", icon: <WiCloudy /> },
  { iconName: "09n", icon: <WiRainMix /> },
  { iconName: "10n", icon: <WiNightShowers /> },
  { iconName: "11n", icon: <WiThunderstorm /> },
  { iconName: "13n", icon: <WiSnow /> },
  { iconName: "50n", icon: <WiDaySunny /> },
]

const Container = styled.div<{ background?: string }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: background 1s;

  background: rgb(6,0,103);
  ${p => p.background && css`
    background: ${p.background};
  `}
`

const Temperature = styled.h4`
  color: white;
  font-size: 2em;
  margin: 0;
`

function HomePage() {
  const { getWeatherByCityName } = useWeather()

  const apiKey = useMemo<string>(() => '427dfea58a376addcf4c40de09f83f45', [])
  
  const [ city, setCity ] = useState<string>('')
  const [ searchCity, setSearchCity ] = useState<string>('dubai')
  const [ weather, setWeather ] = useState<IReturn>()
  const [ weatherIcon, setWeatherIcon ] = useState<string>()
  const [ temperature, setTemperature ] = useState<number>()
  const [ cityName, setCityName ] = useState<string>()
  const [ background, setBackground ] = useState<string>('#232394')
  
  const handleChangeCity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    const timeout = setTimeout(() => {
      setSearchCity(e.target.value)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    console.log({ weather })
    setWeatherIcon(weather?.weather[0].icon)
    setTemperature(weather?.main.temp)
    setCityName(`${weather?.name} - ${weather?.sys.country}`)
  }, [weather])

  useEffect(() => {
    let color: string = ''
    switch (weatherIcon) {
      case '01d':
        color = '#3780fd'
        break;
      case '02d':
        color = '#609bff'
        break;
      case '03d':
        color = '#8ab5ff'
        break;
      case '04d':
        color = '#6c8abd'
        break;
      case '09d':
        color = '#384f77'
        break;
      case '10d':
        color = '#3d6ab9'
        break;
      case '11d':
        color = '#1b2e50'
        break;
      case '13d':
        color = '#accaff'
        break;
      case '50d':
        color = '#92a1bb'
        break;
      case '01n':
        color = '#061e48'
        break;
      case '02n':
        color = '#192d50'
        break;
      case '03n':
        color = '#2e3e5a'
        break;
      case '04n':
        color = '#2e394c'
        break;
      case '09n':
        color = '#1f2838'
        break;
      case '10n':
        color = '#202f4a'
        break;
      case '11n':
        color = '#0f1a2d'
        break;
      case '13n':
        color = '#262b33'
        break;
      case '50n':
        color = '#2d3440'
        break;
      default:
        break;
    }

    setBackground(color)
  }, [weatherIcon])

  const attWeather = useCallback(async () => {
    try {
      // console.log(attWeather)
      const weather = await getWeatherByCityName(searchCity, apiKey)
      setWeather(weather)
    } catch (e) {
      console.error(e)
    }
  }, [getWeatherByCityName, searchCity, apiKey])

  useEffect(() => {
    attWeather()
  }, [attWeather])

  return (
    <Container
      background={background}
    >
      <Box
        position='absolute'
        width='100%'
        height='100%'
        background='linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255,255,255,0.15) 100%)'
        pointerEvents='none'
      />
      <Input
        variant="flushed"
        placeholder="Search any city you want"
        size="lg"
        top='0'
        position='absolute'
        fontSize='30px'
        height='auto'
        padding='10px'
        value={city}
        onChange={handleChangeCity}
      />
      {weather &&
        <>
          <Flex fontSize='10em' color='white'>
            {weatherToIcon.find(w => w.iconName === weatherIcon)?.icon}
          </Flex>

          <Temperature>{temperature}ºc</Temperature>
          <Flex alignItems='center' color='white' gridGap='5px'>
            <MdPlace />
            {cityName}
          </Flex>
        </>
      }
    </Container>
  )
}

export default HomePage
