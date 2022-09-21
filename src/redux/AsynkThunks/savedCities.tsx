import {createAsyncThunk} from '@reduxjs/toolkit';

import {getForecastSavedCity, getWeatherSavedCity} from '@helpers/API';
import {City} from '@redux/types';
import {setWeather} from '@redux/slices/weatherSlice';
import {setForecast} from '@redux/slices/forecastSlice';


export const fetchWeatherForSavedCity = createAsyncThunk<object, City, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (data, {rejectWithValue, dispatch}) => {
        const {lat, lon} = data
        const response = await getWeatherSavedCity(lat, lon)
        if (response) {
            return dispatch(setWeather(response.data))
        }

        return rejectWithValue('fetch weather for saved city error')
    }
)

export const fetchWeatherFromSavedCity = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const {savedCity}: any = getState()
        if (savedCity.cities.length === 0) return
        const {lat, lon} = savedCity.cities[0]
        const {data} = await getWeatherSavedCity(lat, lon)
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
        const response = await getForecastSavedCity(lat, lon)
        if (response) {
            return dispatch(setForecast(response.data.daily))
        }
        return rejectWithValue('fetch forecast for saved city error')

    }
)

export const fetchForecastFromSavedCity = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'savedWeather/fetchWeatherForSavedCity',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const {savedCity}: any = getState()
        if (savedCity.cities.length === 0) return
        const {lat, lon} = savedCity.cities[0]
        const {data} = await getForecastSavedCity(lat, lon)
        if (data) {
            return dispatch(setForecast(data.daily))
        }
        return rejectWithValue('fetch forecast from saved city error')
    }
)
