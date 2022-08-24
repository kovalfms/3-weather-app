import React, {useState} from 'react';
import {AppBar, Box, Button, TextField, Toolbar} from "@mui/material";
import {LocationOnOutlined, SearchOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {fetchByCity, fetchDataByLocation} from "../redux/slices/weatherSlice";
import {fetchForecastByCity, fetchForecastByLocation} from "../redux/slices/forecastSlice";


const Navbar = () => {
    const [city, setCity] = useState('')

    const dispatch = useDispatch()

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
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#11505f"
                }}>
                    <TextField
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{width: "300px"}}/>
                    <Button onClick={getWeatherByCity} variant="outlined" size="large">
                        <SearchOutlined sx={{color: "salmon"}}/>
                    </Button>
                    <Button sx={{marginLeft: "20px"}} onClick={getWeatherByLocation} variant="outlined" size="large">
                        <LocationOnOutlined sx={{color: "salmon"}}/>
                        GET LOCATION WEATHER
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;