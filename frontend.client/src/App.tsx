import { useEffect, useState } from 'react';
import './App.css';
import { Products } from './components/Products';
import { ProductDto } from './DTOs/ProductDto';
import { getProducts, getCategoriesWithProducts } from './services/productService';
import { Categories } from './components/Categories';
import { CategoryDto } from './DTOs/CategoryDto';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';



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


                <Categories categories={categories} />


            </ThemeProvider>
            
        </div>
    );
}

export default App;