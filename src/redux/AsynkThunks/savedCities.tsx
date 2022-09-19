import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {API_KEY} from '@helpers/API';
import {City} from '@redux/types';
import {setWeather} from '@redux/slices/weatherSlice';
import {setForecast} from '@redux/slices/forecastSlice';
import {initialState} from '@redux/slices/savedCitySlice';

export const fetchWeatherForSavedCity = createAsyncThunk<object, City, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (data, {rejectWithValue, dispatch}) => {
        const {lat, lon} = data
        const response = await axios.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (response) {
            return dispatch(setWeather(response.data))
        }

        return rejectWithValue('fetch weather for saved city error')
    }
)
export const fetchWeatherFromSavedCity = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (_, {rejectWithValue, dispatch}) => {
        if (initialState.cities.length === 0) {
            return dispatch(setWeather(undefined))
        }
        const {lat, lon} = initialState.cities[0]
        const {data} = await axios.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (data) {
            return dispatch(setWeather(data))
        }

        return rejectWithValue('fetch weather from saved city error')
    }
)

export const fetchForecastForSavedCity = createAsyncThunk<object, City, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (data, {rejectWithValue, dispatch}) => {
        const {lat, lon} = data
        const response = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
        if (response) {
            return dispatch(setForecast(response.data.daily))
        }
        return rejectWithValue('fetch forecast for saved city error')

    }
)

export const fetchForecastFromSavedCity = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (_, {rejectWithValue, dispatch}) => {
        if (initialState.cities.length === 0) return dispatch(setForecast([]))
        const {lat, lon} = initialState.cities[0]
        const response = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
        if (response) {
            return dispatch(setForecast(response.data.daily))
        }
        return rejectWithValue('fetch forecast from saved city error')
    }
)
