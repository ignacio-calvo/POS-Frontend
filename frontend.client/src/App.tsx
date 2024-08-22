import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderMenu } from './pages/OrderMenu';
import { Navbar } from './Navbar';
import { Customers } from './pages/Customers';
import useProduct from './hooks/useProduct';
import Box from '@mui/material/Box';
import { CategoriesComponent } from './components/CategoriesComponent';
import LoginForm from './components/LoginForm';
import CustomerRegistrationForm from './components/CustomerRegistrationForm';
import { Cart } from './pages/Cart';
import { OrderProvider } from './contexts/OrderContext';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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

    const { categories, loading, error } = useProduct();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <OrderProvider> 
                <Router>
                    <Navbar />
                    <Box component="main" className="mainContainer">
                        <Routes>
                            <Route path="/" element={<OrderMenu categories={categories || []} />} />
                            <Route path="/Customers" element={<Customers baseUrl={CUSTOMERS_API_URL} />} />
                            <Route path="/Categories" element={<CategoriesComponent baseUrl={PRODUCTS_API_URL} />} />
                            <Route path="/Cart" element={<Cart />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<CustomerRegistrationForm />} />
                            <Route path="*" element={<OrderMenu categories={categories || []} />} />
                        </Routes>
                    </Box>
                </Router>
            </OrderProvider>
        </ThemeProvider>
    );
}

export default App;
