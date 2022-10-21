import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY || 'b9d77d08b996b12efcdd7e021ac54bfb'

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

export const getWhetherByCity = (lat: string, lng: string) =>
    api.get(`/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)

export const getWhetherByLocation = (latitude: number, longitude: number) =>
    api.get(`/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)

export const getForecastByLocation = (latitude: number, longitude: number) =>
    api.get(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)

export const getForecastByCity = (lat: string, lng: string) =>
    api.get(`/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)

export const getWeatherSavedCity = (lat: number, lon: number) =>
    api.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)

export const getForecastSavedCity = (lat: number, lon: number) =>
    api.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)