import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        href='/'
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{ flexGrow: 1,color: '#FFF', display: { xs: 'none', sm: 'block' } }}
                    >
                        NEWS
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;