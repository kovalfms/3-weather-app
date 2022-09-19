import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Forecast} from '@redux/types';
import {fetchForecastByCity, fetchForecastByLocation} from '@redux/AsynkThunks/forecast';

type ForecastData = {
    forecastData: Forecast[],
    status: string | null
}

const initialState: ForecastData = {
    forecastData: [],
    status: null
}

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
            .addCase(fetchForecastByLocation.fulfilled, (state) => {
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