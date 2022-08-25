import React, {useEffect} from 'react';
import classes from './Display.module.css';
import {v4 as uniqueId} from 'uuid';

import {Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {LocationOnOutlined, Opacity, ThermostatAuto, Visibility, WindPower} from "@mui/icons-material";

import CityChip from "../Chip/CityChip";
import ForecastCard from "../Card/ForecastCard";

import {fetchDataByLocation} from "../../redux/slices/weatherSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchForecastByLocation} from "../../redux/slices/forecastSlice";
import {saveCity} from "../../redux/slices/savedCitySlice";


const Display = () => {
    const {weatherData: data, status} = useSelector(state => state.weather)
    const {forecastData} = useSelector(state => state.forecast)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataByLocation())
        dispatch(fetchForecastByLocation())
    }, [dispatch])

    const handleSave = () => {
        const saveData = {
            id: uniqueId(),
            name: data.name,
            lon: data.coord.lon,
            lat: data.coord.lat
        }
        dispatch(saveCity(saveData))
    }

    return (
        status === 'loading'
        ? <Typography variant="h2" component="h2" textAlign="center">LOADING</Typography>
        : <Box className={classes.wrap}>
            <Grid container spacing={1} flex direction="row">
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperLeft}>
                        {!data
                            ? <Typography variant="h3">&#128543; Choose town or get location weather!</Typography>
                            :<>
                                <Grid item margin="5px" sx={{ width: "220px",display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="h5" component="h2" color="#ffff">{data?.name}</Typography>
                                    <Button sx={{fontSize: "14px"}} variant="outlined" color="warning" onClick={handleSave} size="small">Save</Button>
                                </Grid>
                                <Box flex justifyContent='center' alignItems="center">
                                    <Typography variant="h1" fontSize="120px"
                                                color="salmon">{data?.main.temp.toFixed(0)}°C</Typography>
                                </Box>
                                <Typography variant="h3" component="h5" color="#ffff">{data.weather[0].main}</Typography>
                                <List sx={{bgcolor: "#f1f1f114"}} className={classes.list}>
                                    <ListItem>
                                        <WindPower/>
                                        <ListItemText>Wind</ListItemText>
                                        <ListItemText sx={{textAlign: "right"}}>{data.wind.speed} m\s</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li"/>
                                    <ListItem>
                                        <Opacity/>
                                        <ListItemText>Humidity</ListItemText>
                                        <ListItemText sx={{textAlign: "right"}}>{data.main.humidity} %</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li"/>
                                    <ListItem>
                                        <Visibility/>
                                        <ListItemText>Visibility</ListItemText>
                                        <ListItemText sx={{textAlign: "right"}}>{data.visibility} m</ListItemText>
                                    </ListItem>
                                    <Divider variant="middle" component="li"/>
                                    <ListItem>
                                        <ThermostatAuto/>
                                        <ListItemText>Pressure</ListItemText>
                                        <ListItemText sx={{textAlign: "right"}}>{data.main.pressure} hPa</ListItemText>
                                    </ListItem>
                                </List>
                            </>
                        }
                    </Paper>
                    <CityChip/>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperRight}>
                        {!forecastData
                            ? <Typography variant="h3">&#128543;</Typography>
                        :forecastData?.map((item, i) => {
                            return <ForecastCard
                                key={i}
                                data={item}
                            />
                        })
                        }
                    </Paper>
                </Grid>
            </Grid>
            </Box>

)
};

export default Display;