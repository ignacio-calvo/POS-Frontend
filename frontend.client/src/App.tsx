import { useEffect, useState } from 'react';
import './App.css';
import { ProductDto } from './DTOs/ProductDto';
import { getProducts, getCategoriesWithProducts } from './services/productService';
import { CategoryDto } from './DTOs/CategoryDto';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home';
import { Navbar} from './Navbar';
import { Customers } from './pages/Customers';


function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); //used for establishing theme based on OS/Browser preference of the user

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategoriesWithProducts();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home categories={categories} />} />
                        <Route path="/Customers" element={<Customers baseUrl={"https://localhost:7030"} />} />
                        <Route path="*" element={<Home categories={categories} />} />
                    </Routes>
                </Router>            
            </ThemeProvider>            
        </div>
    );
}

export default App;