import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Weather} from '@redux/types';
import {fetchByCity, fetchDataByLocation} from '@redux/AsynkThunks/weather';


type WeatherState = {
    weatherData?: Weather,
    errorCode: number | undefined,
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
    errorCode: undefined,
    status: ''
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather(state, action: PayloadAction<Weather | undefined>) {
            state.weatherData = action.payload
        },
        setErrorCode(state, action) {
            state.errorCode = action.payload
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

export const {setWeather, setErrorCode} = weatherSlice.actions
export default weatherSlice.reducer