import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {baseStorage} from '@helpers/baseStorage';
import {City} from '@redux/types';


type SavedCityState = {
    cities: City[],
    status?: string
}

export const initialState: SavedCityState = {
    cities: baseStorage.getItem('saved_cities') || [],
    status: ''
}


const savedCitySlice = createSlice({
    name: 'savedCity',
    initialState,
    reducers: {
        saveCity(state, action: PayloadAction<City>) {
            if (!state.cities.find(city => city.name === action.payload.name)) {
                state.cities.push(action.payload)
            }
            baseStorage.setItem('saved_cities', state.cities)
        },

        deleteSavedCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.id !== action.payload)
            baseStorage.setItem('saved_cities', state.cities)
        }
    }
})

export const {saveCity, deleteSavedCity} = savedCitySlice.actions
export default savedCitySlice.reducer