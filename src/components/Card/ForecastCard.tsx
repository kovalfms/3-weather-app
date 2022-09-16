import React from 'react';
import {Box, Grid, List, ListItem, ListItemText, Paper, Typography} from '@mui/material';
import {Opacity, ThermostatAuto, Visibility, WindPower} from '@mui/icons-material';

import {Forecast} from '@redux/types';
import {dateFormat} from '@helpers/dateFormat';

import classes from './ForecastCard.module.css';

interface ForecastCardProps {
    data: Forecast
}

export const ForecastCard: React.FC<ForecastCardProps> = ({data}) => {

    const {date, day} = dateFormat(data.dt)

    return (
        <Grid>
            <Paper elevation={3} className={classes.paper} sx={{bgcolor: '#f1f1f114'}}>
                <Box margin="5px" display="flex" flexDirection="column" textAlign="center" justifyContent="center">
                    <Typography variant="h6" color="#000000">{day}</Typography>
                    <Typography variant="h6" color="#000000">{date}</Typography>
                </Box>
                <Grid item sx={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'120px'}}>
                    <Box>
                        <Typography variant="h5" fontSize="20px" color="salmon">
                            {data.temp.max.toFixed(0)}/{data.temp.min.toFixed(0)}°C
                        </Typography>
                    </Box>
                    <Box><img src={` http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="icon"/></Box>
                </Grid>

                <List sx={{bgcolor: '#f1f1f114', padding: 0}} className={classes.list}>
                    <ListItem sx={{padding: 0 }}>
                        <WindPower/>
                        <ListItemText  sx={{textAlign:'center'}}>{data.wind_speed} m/s</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: '2px', padding: 0}}>
                        <Opacity/>
                        <ListItemText sx={{textAlign:'center'}}>{data.humidity} %</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: '2px', padding: 0}}>
                        <Visibility/>
                        <ListItemText  sx={{textAlign:'center'}}>10000 m</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: '2px', padding: 0}}>
                        <ThermostatAuto/>
                        <ListItemText  sx={{textAlign:'center'}}>{data.pressure} hPa</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    );
};