import {configureStore} from "@reduxjs/toolkit";
import weather from './slices/weatherSlice';
import forecast from './slices/forecastSlice';


export const store = configureStore({
    reducer: {
        weather,
        forecast
    }
})