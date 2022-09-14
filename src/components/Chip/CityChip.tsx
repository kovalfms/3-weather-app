import React, {useState} from 'react';

import {Badge, Button, Chip, ClickAwayListener, Grid, Paper, Stack} from '@mui/material';
import {PushPinOutlined} from '@mui/icons-material';

import {
    deleteSavedCity,
    fetchForecastForSavedCity,
    fetchWeatherForSavedCity
} from '../../redux/slices/savedCitySlice';
import {City} from '../../redux/types';
import {useAppDispatch, useAppSelector} from '../../hooks';


const CityChip: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);


    const {cities} = useAppSelector(state => state.savedCity)
    const dispatch = useAppDispatch()

    const handleDelete = (id: string) => () => {
        dispatch(deleteSavedCity(id))
    };

    const handleClick = (data: City) => {
        dispatch(fetchWeatherForSavedCity(data))
        dispatch(fetchForecastForSavedCity(data))
    }
    const handleClickOpen = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Grid
                container
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                direction="column"
                position="relative"
                marginLeft="20px"
            >
                <Badge badgeContent={cities.length} color="primary">
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleClickOpen}
                        sx={{color: 'white'}}
                    >
                        <PushPinOutlined sx={{color: 'salmon'}}/>
                        saved cities
                    </Button>
                </Badge>
                {open &&
                    <Paper>
                        <Stack
                            display="flex"
                            direction="row"
                            flexWrap="wrap"
                            alignItems="center"
                            maxWidth="400px"
                            maxHeight="150px"
                            justifyContent="space-around"
                            position="absolute"
                            overflow="auto"
                        > {cities.map((data) => {
                                return (
                                    <Chip
                                        sx={{marginTop: '12px'}}
                                        key={data.id}
                                        label={data.name}
                                        color="success"
                                        onDelete={handleDelete(data.id)}
                                        clickable
                                        onClick={() => handleClick(data)}
                                    />
                                );
                            })}
                        </Stack>
                    </Paper>
                }
            </Grid>
        </ClickAwayListener>
    );
};

export default CityChip;