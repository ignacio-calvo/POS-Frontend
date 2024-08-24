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
import { useCustomer } from './contexts/useCustomer';
import './App.css';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const Navbar: FC = () => {
    const { t, i18n } = useTranslation('Navbar');

    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loginAnchorEl, setLoginAnchorEl] = useState<null | HTMLElement>(null);
    const { order } = useOrder();
    const { clearCustomer } = useCustomer(); // Use the clearCustomer method from the context

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
        clearCustomer(); 
        handleLoginMenuClose();
        navigate('/');
    };

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        i18n.changeLanguage(event.target.value as string);
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
                        {t("menu")}
                    </Button>
                </Box>
                <Box className="navbar-settings">
                    {isAuthenticated && (
                        <>
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
                                    {t('customers')}
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/Categories"
                                    onClick={handleMenuClose}
                                >
                                    {t("categories")}
                                </MenuItem>
                            </Menu>
                        </>
                    )}
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
                            <>
                                <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleLoginMenuClose}
                                >
                                    {t("profile")}
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    {t("logout")}
                                </MenuItem>
                            </>
                        ) : [
                            <MenuItem
                                key="login"
                                component={Link}
                                to="/login"
                                onClick={handleLoginMenuClose}
                            >
                                {t("login")}
                            </MenuItem>,
                            <MenuItem
                                key="register"
                                component={Link}
                                to="/register"
                                onClick={handleLoginMenuClose}
                            >
                                {t("register")}
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
                    <Select
                        value={i18n.language}
                        onChange={handleLanguageChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ color: 'white', marginLeft: '10px' }}
                    >
                        <MenuItem value="en">En</MenuItem>
                        <MenuItem value="es">Es</MenuItem>
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
