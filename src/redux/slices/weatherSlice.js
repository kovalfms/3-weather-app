import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_KEY} from "../../helpers/API";

const initialState = {
    weatherData:  '',
    status: null
}


export const fetchDataByLocation = createAsyncThunk(
    'weather/fetchDataByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position) => {
            try {
                const {latitude, longitude} = position.coords
                const {data} = await axios.get(`/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
                return dispatch(setWeather(data))
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
        const error = (e) => {
            console.warn(`ERROR(${e.code}): ${e.message}`);

        }
        navigator.geolocation.getCurrentPosition(success, error)

    }

)

export const fetchByCity = createAsyncThunk(
    'weather/fetchByCity',
    async (city, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await axios.get(`/weather?q=${city}&units=metric&appid=${API_KEY}`)
            return dispatch(setWeather(data))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather(state, action) {
            state.weatherData = action.payload
        },
        setForecast(state, action) {
            state.forecastData = action.payload
        }
    },
    extraReducers: {
        [fetchByCity.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchByCity.fulfilled]: (state, action) => {
            state.status = 'success'
        },
        [fetchByCity.rejected]: (state, action) => {
            state.status = 'error'
        },
        [fetchDataByLocation.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchDataByLocation.fulfilled]: (state, action) => {
            state.weatherData = action.payload
            state.status = 'success'
        },
        [fetchDataByLocation.rejected]: (state, action) => {
            state.status = 'error'
        }

    }
})

export const {setWeather} = weatherSlice.actions
export default weatherSlice.reducer