import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {City} from '@redux/types';


export type SavedCityState = {
    cities: City[],
    status?: string
}

const initialState: SavedCityState = {
    cities:[],
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
            // baseStorage.setItem('saved_cities', state.cities)
        },

        deleteSavedCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.id !== action.payload)
            // baseStorage.setItem('saved_cities', state.cities)
        }
    }
})

export const {saveCity, deleteSavedCity} = savedCitySlice.actions
export default savedCitySlice.reducer