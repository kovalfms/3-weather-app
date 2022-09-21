import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import weather from './slices/weatherSlice'
import forecast from './slices/forecastSlice'
import savedCity from './slices/savedCitySlice'

const rootReducer = combineReducers({
    weather,
    forecast,
    savedCity
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['savedCity']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch