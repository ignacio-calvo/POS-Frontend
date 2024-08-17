import { FC, useState, useEffect } from 'react';
import { CategoryDto } from '../DTOs/CategoryDto';
import { ProductDto } from '../DTOs/ProductDto';
import Button from '@mui/material/Button';
import { MenuProductsComponent } from './MenuProductsComponent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// Customizing Button to avoid text showing in ALL CAPS as MUI does by default
const CustomButton = styled(Button)({
    textTransform: 'none',
});

interface Props {
    categories: CategoryDto[];
}

export const MenuCategoriesComponent: FC<Props> = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);

    const handleCategoryChange = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    // Display products upon selecting category
    useEffect(() => {
        const category = categories.find(category => category.id === selectedCategory);
        setFilteredProducts(category?.products ?? []);
    }, [selectedCategory, categories]);

    // Select first category on load
    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0].id);
        }
    }, [categories]);

    return (
        <div>
            <Grid container spacing={2}>
                {categories.map(category => (
                    <Grid item key={category.id}>
                        <CustomButton
                            variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            <img src={`./img/${category.imageUrl}`} className="itemIcon" alt={category.name}></img>
                            <p>{category.name}</p>
                        </CustomButton>
                    </Grid>
                ))}
            </Grid>
            <MenuProductsComponent products={filteredProducts} />
        </div>
    );
};
