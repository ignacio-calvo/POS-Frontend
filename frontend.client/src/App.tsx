import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home';
import { Navbar} from './Navbar';
import { Customers } from './pages/Customers';
import useProductData from './hooks/useProductData';


function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); //used for establishing theme based on OS/Browser preference of the user
    const CUSTOMERS_API_URL: string = import.meta.env.VITE_CUSTOMERS_API_URL || "";

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const { products, categories, loading, error } = useProductData();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home categories={categories || []} />} />
                        <Route path="/Customers" element={<Customers baseUrl={CUSTOMERS_API_URL} />} />
                        <Route path="*" element={<Home categories={categories || []} />} />
                    </Routes>
                </Router>            
            </ThemeProvider>            
        </div>
    );
}

export default App;