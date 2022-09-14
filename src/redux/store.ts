import {configureStore} from '@reduxjs/toolkit';
 
import weather from './slices/weatherSlice'
import forecast from './slices/forecastSlice'
import savedCity from './slices/savedCitySlice'


export const store = configureStore({
    reducer: {
        weather,
        forecast,
        savedCity
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch