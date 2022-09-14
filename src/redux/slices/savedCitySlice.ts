import axios from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
 
import {API_KEY} from '../../helpers/API';
import {baseStorage} from '../../helpers/baseStorage';
import {City} from '../types';

import {setWeather} from './weatherSlice';
import {setForecast} from './forecastSlice';

type SavedCityState = {
    cities: City[],
    status: string | null 
}

const initialState: SavedCityState = {
    cities: baseStorage.getItem('saved_cities') || [],
    status: null
}

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
        if (initialState.cities.length === 0) return dispatch(setWeather({
            name: '',
            weather: [{
                main: ''
            }],
            main: {
                temp: 0,
                humidity: 0,
                pressure: 0
            },
            wind: {
                speed: 0,
            },
            visibility: 0,
            coord: {
                lon: 0,
                lat: 0
            }
        }))
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
        const {data} = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
        if (data) {
            return dispatch(setForecast(data.daily))
        }
        return rejectWithValue('fetch forecast from saved city error')
    }
)


const savedCitySlice = createSlice({
    name: 'savedCity',
    initialState,
    reducers: {
        saveCity(state, action: PayloadAction<City>) {
            if (!state.cities.find(city => city.name === action.payload.name)) {
                state.cities.push(action.payload)
            }
            baseStorage.setItem('saved_cities', state.cities)
        },

        deleteSavedCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.id !== action.payload)
            baseStorage.setItem('saved_cities', state.cities)

        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchWeatherForSavedCity.pending, (state) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(fetchWeatherForSavedCity.fulfilled, (state) => {
    //             state.status = 'success'
    //         })
    //         .addCase(fetchWeatherForSavedCity.rejected, (state) => {
    //             state.status = 'error'
    //         })
    //         .addCase(fetchWeatherFromSavedCity.pending, (state) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(fetchWeatherFromSavedCity.fulfilled, (state) => {
    //
    //             state.status = 'success'
    //         })
    //         .addCase(fetchWeatherFromSavedCity.rejected, (state) => {
    //             state.status = 'error'
    //         })
    // }

})

export const {saveCity, deleteSavedCity} = savedCitySlice.actions
export default savedCitySlice.reducer