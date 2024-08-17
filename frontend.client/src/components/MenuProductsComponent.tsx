import { FC, useState, ChangeEvent } from 'react';
import { MenuProductComponent } from './MenuProductComponent';
import { ProductDto } from '../DTOs/ProductDto';
import { TextField, InputAdornment, Grid } from '@mui/material';
import { Search } from '@mui/icons-material';
import '../App.css';

interface Props {
    products: ProductDto[];
}

export const MenuProductsComponent: FC<Props> = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Search Products"
                value={searchQuery}
                onChange={handleFilterChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                margin="normal"
            />
            <Grid container spacing={2}>
                {filteredProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                        <MenuProductComponent
                            id={product.id}
                            name={product.name}
                            productImageUrl={product.productImageUrl}
                            sizes={product.sizes}
                            description={product.description}
                            displayOrder={product.displayOrder}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
