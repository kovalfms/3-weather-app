import React from 'react';
import classes from './ForecastCard.module.css';

import {Box, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {Opacity, ThermostatAuto, Visibility, WindPower} from "@mui/icons-material";

const ForecastCard = () => {
    return (
        <Grid>
            <Paper elevation={3} className={classes.paper} sx={{bgcolor: '#f1f1f114'}}>
                <Box margin="5px">
                    {/*<img src="http://openweathermap.org/img/w/01d.png" alt="icon"/>*/}
                    <Typography variant="title" component="h2" color="#000000">Monday</Typography>
                </Box>
                <Box flex justifyContent='center' alignItems="center">
                    <Typography variant="h5" fontSize="20px" color="salmon">26°C</Typography>
                </Box>
                <Typography variant="h3" component="h5" fontSize="20px" color="#ffff">Clear</Typography>
                <List sx={{bgcolor: '#f1f1f114'}} className={classes.list}>
                    <ListItem sx={{padding: 0 }}>
                        <WindPower/>
                        <ListItemText  sx={{textAlign:"center"}}>12345</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: "2px", padding: 0}}>
                        <Opacity/>
                        <ListItemText sx={{textAlign:"center"}}>12345</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: "2px", padding: 0}}>
                        <Visibility/>
                        <ListItemText  sx={{textAlign:"center"}}>12345</ListItemText>
                    </ListItem>
                    <ListItem sx={{margin: "2px", padding: 0}}>
                        <ThermostatAuto/>
                        <ListItemText  sx={{textAlign:"center"}}>12345</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    );
};

export default ForecastCard;