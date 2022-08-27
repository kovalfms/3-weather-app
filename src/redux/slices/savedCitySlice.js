import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {baseStorage} from "../../helpers/baseStorage";
import axios from "axios";
import {API_KEY} from "../../helpers/API";
import {setWeather} from "./weatherSlice";
import {setForecast} from "./forecastSlice";

const initialState = {
    cities: baseStorage.getItem('saved_cities') || []
}

export const fetchWeatherForSavedCity = createAsyncThunk(
    'savedWeather/fetchWeatherForSavedCity',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const {lat, lon} = data
            const response = await axios.get(`/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
            baseStorage.setItem('weather', response.data)
            return dispatch(setWeather(response.data))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const fetchForecastForSavedCity = createAsyncThunk(
    'savedWeather/fetchWeatherForSavedCity',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            const {lat, lon} = data
            const response = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
            baseStorage.setItem('forecast', response.data.daily)
            return dispatch(setForecast(response.data.daily))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const savedCitySlice = createSlice({
    name: 'savedCity',
    initialState,
    reducers: {
        saveCity(state, action) {
            if (!state.cities.find(city => city.name === action.payload.name)){
                state.cities.push(action.payload)
            }
            baseStorage.setItem('saved_cities', state.cities)
        },

        deleteSavedCity(state, action) {
            state.cities = state.cities.filter(city => city.id !== action.payload.id)
            baseStorage.setItem('saved_cities', state.cities)

        }
    }
})

export const {saveCity, deleteSavedCity} = savedCitySlice.actions
export default savedCitySlice.reducer