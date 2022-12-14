import React, {useEffect} from 'react';
import {v4 as uniqueId} from 'uuid';
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    LinearProgress,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import {Opacity, ThermostatAuto, Visibility, WindPower} from '@mui/icons-material';

import {CityChip} from '@components/Chip';
import {ForecastCard} from '@components/Card';
import {deleteSavedCity, saveCity} from '@redux/slices/savedCitySlice';

import {useAppDispatch, useCity, useForecast, useWeather} from '@helpers/hooks';
import {City} from '@redux/types';

import {fetchForecastFromSavedCity, fetchWeatherFromSavedCity} from '@redux/AsynkThunks/savedCities';
import {fetchForecastByLocation} from '@redux/AsynkThunks/forecast';
import {fetchDataByLocation} from '@redux/AsynkThunks/weather';

import classes from './Display.module.css';


export const Display: React.FC = () => {
    const {weatherData: data, status, errorCode} = useWeather()
    const {cities} = useCity()
    const {forecastData} = useForecast()
    const dispatch = useAppDispatch()

    const findCity = cities.find(city => city.name === data?.name)

    useEffect(() => {
        if (errorCode !== 1) {
            dispatch(fetchForecastByLocation())
            dispatch(fetchDataByLocation())
        } else {
            dispatch(fetchWeatherFromSavedCity())
            dispatch(fetchForecastFromSavedCity())
        }
    }, [errorCode, dispatch])

    const handleSave = () => {
        if (!data) return
        const saveData: City = {
            id: uniqueId(),
            name: data.name,
            lon: data.coord.lon,
            lat: data.coord.lat
        }
        dispatch(saveCity(saveData))
    }

    const handleDelete = (id: string) => {
        dispatch(deleteSavedCity(id))
    }

    return (
        status === 'loading'
            ? <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>
            : <Box className={classes.wrap}>
                {!data
                    ? <Typography variant="h2" component="h2">&#128521; Choose town or get location weather!</Typography>
                    : <Grid container spacing={1} className={classes.container}>
                        <Grid item xl={4} lg={4} md={6} sm={12}>
                            <Paper elevation={3} sx={{bgcolor: '#f1f1f114'}} className={classes.paperLeft}>
                                <Box>
                                    <Grid
                                        item
                                        margin="5px"
                                        sx={{
                                            width: '220px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                        <Typography variant="h5" color="#ffff">{data.name}</Typography>
                                        {!findCity
                                            ? <Button
                                                sx={{fontSize: '14px'}}
                                                variant="outlined"
                                                color="warning"
                                                onClick={handleSave}
                                                size="small"
                                            >
                                                Save
                                            </Button>
                                            : <Button
                                                sx={{fontSize: '14px'}}
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => handleDelete(findCity.id)}
                                                size="small"
                                            >
                                                Delete
                                            </Button>
                                        }

                                    </Grid>
                                    <Box className={classes.weatherMain}>
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontSize: {
                                                    lg: '80px',
                                                    md: '70px'
                                                }
                                            }}
                                            className={classes.temp}
                                            color="salmon"
                                        >
                                            {data.main.temp.toFixed(0)}??C
                                        </Typography>

                                        <Typography variant="h3" component="h5" color="#ffff">
                                            {data.weather[0].main}
                                        </Typography>
                                    </Box>
                                </Box>

                                <List sx={{bgcolor: '#f1f1f114'}} className={classes.list}>
                                    <ListItem>
                                        <WindPower/>
                                        <ListItemText>Wind</ListItemText>
                                        <ListItemText sx={{textAlign: 'right'}}>{data.wind.speed} m\s</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li" className={classes.divider}/>
                                    <ListItem>
                                        <Opacity/>
                                        <ListItemText>Humidity</ListItemText>
                                        <ListItemText sx={{textAlign: 'right'}}>{data.main.humidity} %</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li" className={classes.divider}/>
                                    <ListItem>
                                        <Visibility/>
                                        <ListItemText>Visibility</ListItemText>
                                        <ListItemText sx={{textAlign: 'right'}}>{data.visibility} m</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li" className={classes.divider}/>
                                    <ListItem>
                                        <ThermostatAuto/>
                                        <ListItemText>Pressure</ListItemText>
                                        <ListItemText sx={{textAlign: 'right'}}>{data.main.pressure} hPa</ListItemText>
                                    </ListItem>
                                </List>
                            </Paper>
                            <Box marginTop="20px">
                                <CityChip/>
                            </Box>
                        </Grid>
                        <Grid item xl={8} lg={7} md={12} sm={12}>
                            <Paper elevation={3} sx={{bgcolor: '#f1f1f114'}} className={classes.paperRight}>
                                {!forecastData
                                    ? <Typography variant="h3">
                                        &#128543; Unfortunately, we were unable to get a forecast for the week.
                                    </Typography>
                                    : forecastData.map((item, i) => {
                                        return <ForecastCard
                                            key={i}
                                            data={item}
                                        />
                                    })
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </Box>
    )
};