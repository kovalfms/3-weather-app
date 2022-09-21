import {createAsyncThunk} from '@reduxjs/toolkit';

import {getForecastByCity, getForecastByLocation} from '@helpers/API';
import {setForecast} from '@redux/slices/forecastSlice';
import {CitiesList} from '@redux/types'

export const fetchForecastByLocation = createAsyncThunk<object, undefined, { rejectValue: string }>(
    'forecastfetchForecastByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position: GeolocationPosition) => {
            const {latitude, longitude} = position.coords
            const {data} = await getForecastByLocation(latitude, longitude)
            if (data) {
                return dispatch(setForecast(data.daily))
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

export const fetchForecastByCity = createAsyncThunk<object, CitiesList, { rejectValue: string }>(
    'forecast/fetchForecastByCity',
    async (city, {rejectWithValue, dispatch}) => {
        const {lat, lng} = city
        const response = await getForecastByCity(lat, lng);
        if (response) {
            return dispatch(setForecast(response.data.daily))
        }
        return rejectWithValue('fetch forecast by city error')

    }
)