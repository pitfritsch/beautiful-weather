import React, { useCallback, useMemo } from 'react'
import { WiNightAltRain } from "react-icons/wi";
import { MdPlace } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import useWeather, { IReturn } from '../hooks/useWeather';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: rgb(6,0,103);
  background: linear-gradient(to left top, rgba(6,0,103,1) 0%, rgba(0,0,152,1) 50%, rgba(0,0,215,1) 100%);
`

const Temperature = styled.h4`
  color: white;
  font-size: 2em;
  margin: 0;
`

function HomePage() {
  const { getWeatherByCityName } = useWeather()

  const apiKey = useMemo<string>(() => '427dfea58a376addcf4c40de09f83f45', [])
  const city = useMemo<string>(() => 'novo hamburgo', [])

  const [ weather, setWeather ] = useState<IReturn>()
  const [ temperature, setTemperature ] = useState<number>()
  const [ cityName, setCityName ] = useState<string>()
  
  useEffect(() => {
    console.log({ weather })
    setTemperature(weather?.main.temp)
    setCityName(`${weather?.name} - ${weather?.sys.country}`)
  }, [weather])

  const attWeather = useCallback(async () => {
    try {
      // console.log(attWeather)
      const weather = await getWeatherByCityName(city, apiKey)
      setWeather(weather)
    } catch (e) {
      console.error(e)
    }
  }, [getWeatherByCityName, city, apiKey])

  useEffect(() => {
    attWeather()
  }, [attWeather])

  return (
    <Container>
      {weather &&
        <>
          <WiNightAltRain fontSize='10em' color='white'/>

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
