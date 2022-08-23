import React, {useState} from 'react';
import {AppBar, Box, Button, TextField, Toolbar} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";


const Navbar = () => {
    const [city, setCity] = useState('')

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#11505f"
                }}>
                    <TextField variant="outlined" size="small" sx={{width: "300px"}}/>
                    <Button size="large"><SearchOutlined sx={{color: "salmon"}}/></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;