import React, {useEffect, useState} from 'react';
import {debounce} from 'lodash';

import {AppBar, Autocomplete, Box, Button, TextField, Toolbar, Typography} from '@mui/material';
import {LocationOnOutlined} from '@mui/icons-material';

import {useAppDispatch} from '@helpers/hooks';
import {citiesList} from '@helpers/cities';
import {fetchByCity, fetchDataByLocation} from '@redux/AsynkThunks/weather';
import {fetchForecastByCity, fetchForecastByLocation} from '@redux/AsynkThunks/forecast';
import {CitiesList} from '@redux/types';

import classes from './Navbar.module.css';


export const Navbar: React.FC = () => {
    const [value, setValue] = useState('')
    const [searchCities, setSearchCities] = useState<CitiesList[]>([]);
    const dispatch = useAppDispatch()

    const city = citiesList.filter(city => city.name.toLowerCase().includes(value.toLowerCase()));

    useEffect(() => {
        setSearchCities(city.slice(0, 10));
    }, [value]);

    const getWeatherByCity = (city: CitiesList | null) => {
        if (city) {
            dispatch(fetchByCity(city))
            dispatch(fetchForecastByCity(city))
        }
    }

    const searchCity = (e: { target: { value: React.SetStateAction<string> } }) => setValue(e.target.value)

    const debounceHandler = debounce(searchCity, 500)

    const getWeatherByLocation = () => {
        dispatch(fetchDataByLocation())
        dispatch(fetchForecastByLocation())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{}} className={classes.toolbar}>
                    <Autocomplete
                        size="small"
                        options={searchCities}
                        onChange={(e, val) => getWeatherByCity(val)}
                        getOptionLabel={(option: CitiesList) => `${option.name} ${option.country}`}
                        // isOptionEqualToValue={(option, value) => option.lat === value.lat}
                        renderOption={(props, option) => (
                            <li {...props} key={option.lat}>{option.name} {option.country}</li>
                        )}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                autoFocus
                                variant="outlined"
                                onChange={debounceHandler}
                                sx={{width: '300px'}}/>
                        }
                    />
                    <Button sx={{marginLeft: '20px'}} onClick={getWeatherByLocation} variant="outlined" size="medium">
                        <LocationOnOutlined sx={{color: 'salmon'}}/>
                        <Typography className={classes.geoBtnText}>GET LOCATION WEATHER</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
