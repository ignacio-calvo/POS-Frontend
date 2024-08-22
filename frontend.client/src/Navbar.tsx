import { FC, useState, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'; 
import { logout } from './services/authService';
import { useOrder } from './contexts/OrderContext'; 
import './App.css';

export const Navbar: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
    const [loginAnchorEl, setLoginAnchorEl] = useState<null | HTMLElement>(null);
    const { order } = useOrder(); 

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setLoginAnchorEl(event.currentTarget);
    };

    const handleLoginMenuClose = () => {
        setLoginAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleLoginMenuClose();
        navigate('/');
    };

    const isAuthenticated = !!localStorage.getItem('jwtToken');
    const productCount = order?.orderLines?.length || 0; 

    return (
        <AppBar position="fixed" className="navbar">
            <Toolbar>
                <Box className="navbar-logo">
                    <Link to="/">
                        <img className="logoBanner" src="./img/POSitive-Banner.png" alt="Logo" />
                    </Link>
                </Box>
                <Box className="navbar-menu">
                    <Button
                        color={location.pathname === "/" ? "secondary" : "inherit"}
                        component={Link}
                        to="/"
                    >
                        Menu
                    </Button>
                </Box>
                <Box className="navbar-settings">
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
                    <IconButton
                        color="inherit"
                        onClick={handleLoginMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={loginAnchorEl}
                        open={Boolean(loginAnchorEl)}
                        onClose={handleLoginMenuClose}
                    >
                        {isAuthenticated ? (
                            <MenuItem onClick={handleLogout}>
                                Log out
                            </MenuItem>
                        ) : [
                            <MenuItem
                                key="login"
                                component={Link}
                                to="/login"
                                onClick={handleLoginMenuClose}
                            >
                                Log in
                            </MenuItem>,
                            <MenuItem
                                key="register"
                                component={Link}
                                to="/register"
                                onClick={handleLoginMenuClose}
                            >
                                Register
                            </MenuItem>
                        ]}
                    </Menu>
                    <IconButton
                        color={location.pathname === "/Cart" ? "secondary" : "inherit"}
                        component={Link}
                        to="/Cart"
                    >
                        <Badge badgeContent={productCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
