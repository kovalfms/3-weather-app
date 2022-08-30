import React, {useState} from 'react';
import {Badge, Button, Chip, ClickAwayListener, Grid, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteSavedCity, fetchForecastForSavedCity, fetchWeatherForSavedCity} from "../../redux/slices/savedCitySlice";
import {PushPinOutlined} from "@mui/icons-material";

const CityChip = () => {
    const [open, setOpen] = useState(false);


    const {cities} = useSelector(state => state.savedCity)
    const dispatch = useDispatch()

    const handleDelete = (id) => () => {
        dispatch(deleteSavedCity({id}))
    };

    const handleClick = (data) => {
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
                flex
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
                        <PushPinOutlined sx={{color: "salmon"}}/>
                        saved cities
                    </Button>
                </Badge>
                {open &&
                    <Paper>
                        <Stack
                            flex
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
                                    sx={{marginTop: "12px"}}
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