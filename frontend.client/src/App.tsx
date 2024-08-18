import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from './pages/Menu';
import { Navbar } from './Navbar';
import { Customers } from './pages/Customers';
import useProduct from './hooks/useProduct';
import Box from '@mui/material/Box'; // Import Box from Material-UI
import { CategoriesComponent } from './components/CategoriesComponent';
import LoginForm from './components/LoginForm'; // Import the LoginForm component

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); //used for establishing theme based on OS/Browser preference of the user
    const CUSTOMERS_API_URL: string = import.meta.env.VITE_CUSTOMERS_API_URL || "";
    const PRODUCTS_API_URL: string = import.meta.env.VITE_PRODUCTS_API_URL || "";

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const { products, categories, loading, error } = useProduct();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Box component="main" className="mainContainer">
                    <Routes>
                        <Route path="/" element={<Menu categories={categories || []} />} />
                        <Route path="/Customers" element={<Customers baseUrl={CUSTOMERS_API_URL} />} />
                        <Route path="/Categories" element={<CategoriesComponent baseUrl={PRODUCTS_API_URL} />} />
                        <Route path="/login" element={<LoginForm />} /> {/* Add the login route */}
                        <Route path="*" element={<Menu categories={categories || []} />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
