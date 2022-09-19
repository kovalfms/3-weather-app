import axios from 'axios';

import {createAsyncThunk} from '@reduxjs/toolkit';

import {API_KEY} from '@helpers/API';
import {setWeather} from '@redux/slices/weatherSlice';

export const fetchDataByLocation = createAsyncThunk<object, undefined, {rejectValue : string}>(
    'weather/fetchDataByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position: GeolocationPosition) => {
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
