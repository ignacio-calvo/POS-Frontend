import { FC, useState, MouseEvent } from 'react';
import { Link, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

export const Navbar: FC = () => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <img className="logoBanner" src="./img/POSitive-Banner.png" alt="Logo" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <Box>
                    <Button
                        color={location.pathname === "/" ? "secondary" : "inherit"}
                        component={Link}
                        to="/"
                    >
                        Menu
                    </Button>
                    <IconButton
                        color={location.pathname === "/Customers" || location.pathname === "/Categories" ? "secondary" : "inherit"}
                        onClick={handleMenuOpen}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            component={Link}
                            to="/Customers"
                            onClick={handleMenuClose}
                        >
                            Customers
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/Categories"
                            onClick={handleMenuClose}
                        >
                            Categories
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
