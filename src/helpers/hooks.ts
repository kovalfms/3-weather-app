import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux'

import type {AppDispatch, RootState} from '@redux/store'


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useWeather = () => useAppSelector(state => state.weather);
export const useCity = () => useAppSelector(state => state.savedCity);
export const useForecast = () => useAppSelector(state => state.forecast);