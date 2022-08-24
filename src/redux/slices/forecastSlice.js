import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_KEY} from "../../helpers/API";
import {baseStorage} from "../../helpers/baseStorage";

const initialState = {
    forecastData: [],
    status: null
}

export const fetchForecastByLocation = createAsyncThunk(
    'forecast/fetchForecastByLocation',
    async (_, {rejectWithValue, dispatch}) => {
        const success = async (position) => {
            try {
                const {latitude, longitude} = position.coords
                const {data} = await axios.get(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
                baseStorage.setItem('forecast', data.daily)
                return dispatch(setForecast(data.daily))
            } catch (e) {
                return rejectWithValue(e.message)
            }
        }
        const error = (e) => {
            console.warn(`ERROR(${e.code}): ${e.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
)

export const fetchForecastByCity = createAsyncThunk(
    'forecast/fetchForecastByCity',
    async (city, {rejectWithValue, dispatch}) => {
        try{
            const {data} = await axios.get(`/weather?q=${city}&appid=${API_KEY}`);
            const {lon, lat} = data.coord
            const response = await axios.get(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
            baseStorage.setItem('forecast', response.data.daily)
            return dispatch(setForecast(response.data.daily))

        }catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setForecast(state, action) {
            state.forecastData = action.payload
        }
    },
    extraReducers: {
        [fetchForecastByLocation.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchForecastByLocation.fulfilled]: (state, action) => {
            state.forecastData = action.payload
            state.status = 'success'
        },
        [fetchForecastByLocation.rejected]: (state, action) => {
            state.status = 'error'
        },
        [fetchForecastByCity.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchForecastByCity.fulfilled]: (state, action) => {
            state.status = 'success'
        },
        [fetchForecastByCity.rejected]: (state, action) => {
            state.status = 'error'
        }
    }

})


export const {setForecast} = forecastSlice.actions
export default forecastSlice.reducer