import React from 'react';
import classes from './Display.module.css';

import {Box, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Typography} from "@mui/material";
import {Opacity, ThermostatAuto, Visibility, WindPower} from "@mui/icons-material";

import CityChip from "../CityChip";
import ForecastCard from "../Card/ForecastCard";


const Display = () => {

    return (
        <Box sx={{maxWidth: '1400px', margin: '20px auto 5px', padding: '20px', minHeight: '550px'}}>
          <CityChip/>
            <Grid container spacing={1} flex direction="row">
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperLeft}>
                        <Box margin="10px">
                            <Typography variant="title" component="h2" color="#ffff">Zaporizhzhia</Typography>
                            {/*<img src="http://openweathermap.org/img/w/01d.png"/>*/}
                        </Box>
                        <Box flex justifyContent='center' alignItems="center">
                            <Typography variant="h1" fontSize="120px" color="salmon">26°C</Typography>
                        </Box>
                        <Typography variant="h3" component="h5" color="#ffff">Clear</Typography>
                        <List sx={{bgcolor: "#f1f1f114"}} className={classes.list}>
                            <ListItem>
                                <WindPower/>
                                <ListItemText>Wind</ListItemText>
                                <ListItemText sx={{textAlign:"right"}}>20 m\s</ListItemText>
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                            <ListItem>
                                <Opacity/>
                                <ListItemText>Humidity</ListItemText>
                                <ListItemText sx={{textAlign:"right"}}>80 %</ListItemText>
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                            <ListItem>
                                <Visibility/>
                                <ListItemText>Visibility</ListItemText>
                                <ListItemText sx={{textAlign:"right"}}>120 m</ListItemText>
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                            <ListItem>
                                <ThermostatAuto/>
                                <ListItemText>Pressure</ListItemText>
                                <ListItemText sx={{textAlign:"right"}}>1200 m/A</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper elevation={3} sx={{bgcolor: "#f1f1f114"}} className={classes.paperRight}>
                        <ForecastCard/>
                        <ForecastCard/>
                        <ForecastCard/>
                        <ForecastCard/>
                        <ForecastCard/>
                        <ForecastCard/>
                        <ForecastCard/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
        ;
};

export default Display;