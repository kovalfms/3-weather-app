import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import {API_KEY} from '@helpers/API';
import {Weather} from '@redux/types';


type WeatherState = {
    weatherData?: Weather,
    status?: string
}

const initialState: WeatherState = {
    weatherData: {
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
    },
    status: ''
}


export const fetchDataByLocation = createAsyncThunk<object, undefined, {rejectValue : string}>(
    'weather/fetchDataByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position: { coords: { latitude: number; longitude: number; }}) => {
            const {latitude, longitude} = position.coords
            const {data} = await axios.get(`/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            if(data){
                return dispatch(setWeather(data))
            }
            return rejectWithValue('fetch weather by location is error')
        }
        const error = (e: { code: number; message: string; }) => {
            // eslint-disable-next-line no-console
            console.warn(`ERROR(${e.code}): ${e.message}`);

        }
        navigator.geolocation.getCurrentPosition(success, error)
    }
)

export const fetchByCity = createAsyncThunk<object, string, { rejectValue: string }>(
    'weather/fetchByCity',
    async (city, {rejectWithValue, dispatch}) => {
        const {data} = await axios.get(`/weather?q=${city}&units=metric&appid=${API_KEY}`)
        if (data) {
            return dispatch(setWeather(data))
        } else {
            return rejectWithValue('fetch Error')
        }
    }
)


const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather(state, action: PayloadAction<Weather | undefined>) {
            state.weatherData = action?.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchByCity.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchByCity.fulfilled, (state) => {
                state.status = 'success'
            })
            .addCase(fetchByCity.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(fetchDataByLocation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchDataByLocation.fulfilled, (state) => {
                state.status = 'success'
            })
            .addCase(fetchDataByLocation.rejected, (state) => {
                state.status = 'error'
            })
    }

})

export const {setWeather} = weatherSlice.actions
export default weatherSlice.reducer