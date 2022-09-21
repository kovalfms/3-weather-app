import {createAsyncThunk} from '@reduxjs/toolkit';

import {getWhetherByCity, getWhetherByLocation} from '@helpers/API';
import {setErrorCode, setWeather} from '@redux/slices/weatherSlice';
import {CitiesList} from '@redux/types';

export const fetchDataByLocation = createAsyncThunk<object, undefined, {rejectValue : string}>(
    'weather/fetchDataByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position: GeolocationPosition) => {
            const {latitude, longitude} = position.coords
            const {data} = await getWhetherByLocation(latitude, longitude)
            if(data){
                return dispatch(setWeather(data))
            }
            return rejectWithValue('fetch weather by location is error')
        }
        const error = (e: { code: number; message: string; }) => {
            dispatch(setErrorCode(e.code))
            // eslint-disable-next-line no-console
            console.warn(`ERROR(${e.code}): ${e.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error)
    }
)

export const fetchByCity = createAsyncThunk<object, CitiesList, { rejectValue: string }>(
    'weather/fetchByCity',
    async (city, {rejectWithValue, dispatch}) => {
        const {lat, lng} = city
        const {data} = await getWhetherByCity(lat, lng)
        if (data) {
            return dispatch(setWeather(data))
        } else {
            return rejectWithValue('fetch Error')
        }
    }
)
