import React, {useEffect} from 'react';
import classes from './Display.module.css';

import {Box, Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {Opacity, ThermostatAuto, Visibility, WindPower} from "@mui/icons-material";

import CityChip from "../CityChip";
import ForecastCard from "../Card/ForecastCard";

import {baseStorage} from "../../helpers/baseStorage";
import {fetchDataByLocation} from "../../redux/slices/weatherSlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchForecastByLocation} from "../../redux/slices/forecastSlice";


const Display = () => {
    const {weatherData: data, status} = useSelector(state => state.weather)
    const {forecastData} = useSelector(state => state.forecast)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataByLocation())
        dispatch(fetchForecastByLocation())
    }, [dispatch])

    const handleSave = () => {

        baseStorage.setItem('selected_cities', data)
    }

    return (
        !status
        ? <Typography variant="h2" component="h2" textAlign="center">LOADING</Typography>
        : <Box sx={{maxWidth: '1400px', margin: '20px auto 5px', padding: '20px', minHeight: '550px'}}>
            <CityChip/>
            <Grid container spacing={1} flex direction="row">
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperLeft}>
                        <Grid item margin="5px" sx={{ width: "220px",display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="title" component="h2" color="#ffff">{data?.name}</Typography>
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
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperRight}>
                        {forecastData?.map((item, i) => {
                            return <ForecastCard
                                key={i}
                                data={item}
                            />
                            })}
                    </Paper>
                </Grid>
            </Grid>
        </Box>

)
};

export default Display;