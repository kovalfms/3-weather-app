import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

import {API_KEY} from '../../helpers/API';
import {Forecast} from '../types';

type ForecastData = {
    forecastData: Forecast[],
    status: string | null
}

const initialState: ForecastData = {
    forecastData: [],
    status: null
}

export const fetchForecastByLocation = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'forecastfetchForecastByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position: { coords: { latitude: number; longitude: number; }; }) => {
            const {latitude, longitude} = position.coords
            const response = await axios.get(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
            if(response){
                return dispatch(setForecast(response.data.daily))
            }
            return rejectWithValue('fetch forecast by location error')
        }
        const error = (e: { code: number; message: string; }) => {
            // eslint-disable-next-line no-console
            console.warn(`ERROR(${e.code}): ${e.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }
)

export const fetchForecastByCity = createAsyncThunk<object, string, { rejectValue: string }>(
    'forecast/fetchForecastByCity',
    async (city, {rejectWithValue, dispatch}) => {
        const {data} = await axios.get(`/weather?q=${city}&appid=${API_KEY}`);
        if (data) {
            const {lon, lat} = data.coord
            const response = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
            return dispatch(setForecast(response.data.daily))
        }
        return rejectWithValue('fetch forecast by city error')

    }
)


const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setForecast(state, action: PayloadAction<Forecast[]>) {
            state.forecastData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecastByLocation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchForecastByLocation.fulfilled, (state, action) => {
                // @ts-ignore
                state.forecastData = action.payload
                state.status = 'success'
            })
            .addCase(fetchForecastByLocation.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(fetchForecastByCity.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchForecastByCity.fulfilled, (state) => {
                state.status = 'success'
            })
            .addCase(fetchForecastByCity.rejected, (state) => {
                state.status = 'error'
            })
    }

})


export const {setForecast} = forecastSlice.actions
export default forecastSlice.reducer