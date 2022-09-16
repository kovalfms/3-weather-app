import React, {useState} from 'react';
import {AppBar, Box, Button, TextField, Toolbar, Typography} from '@mui/material';
import {LocationOnOutlined, SearchOutlined} from '@mui/icons-material';

import {fetchByCity, fetchDataByLocation} from '@redux/slices/weatherSlice';
import {fetchForecastByCity, fetchForecastByLocation} from '@redux/slices/forecastSlice';
import {useAppDispatch} from '@helpers/hooks';

import classes from './Navbar.module.css';


export const Navbar: React.FC = () => {
    const [city, setCity] = useState<string>('')

    const dispatch = useAppDispatch()

    const getWeatherByCity = () => {
        dispatch(fetchByCity(city))
        dispatch(fetchForecastByCity(city))
    }

    const getWeatherByLocation = () => {
        dispatch(fetchDataByLocation())
        dispatch(fetchForecastByLocation())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{}} className={classes.toolbar}>
                    <TextField
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{width: '300px'}}/>
                    <Button onClick={getWeatherByCity} variant="text"  size="large">
                        <SearchOutlined sx={{color: 'salmon'}}/>
                    </Button>
                    <Button className={classes.geoBtn}  onClick={getWeatherByLocation} variant="outlined" size="medium">
                        <LocationOnOutlined sx={{color: 'salmon'}}/>
                        <Typography className={classes.geoBtnText}>GET LOCATION WEATHER</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
