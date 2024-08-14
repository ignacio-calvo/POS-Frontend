import { FC, useState, ChangeEvent, useEffect } from 'react';
import { CategoryDto } from '../DTOs/CategoryDto';
import { ProductDto } from '../DTOs/ProductDto';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Products } from './Products';
import { styled } from '@mui/material/styles';

//Customizing Toggle to avoid text showing in ALL CAPS as MUI does by default
const CustomToggleButton = styled(ToggleButton)({
    textTransform: 'none',
});

interface Props {    
    categories: CategoryDto[];
}

export const Categories: FC<Props> = ({ categories }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[]>([]);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (event: React.MouseEvent<HTMLElement>, newCategoryId: number | null) => {
        setSelectedCategory(newCategoryId);
    };

    //display products upon selecting category
    useEffect(() => {
        const category = categories.find(category => category.id === selectedCategory);
        setFilteredProducts(category?.products ?? []);
    }, [selectedCategory, categories]);

    //select first category on load
    useEffect(() => {
        if (filteredCategories.length > 0) {
            setSelectedCategory(filteredCategories[0].id);
        }
    }, [searchQuery, categories]);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    return (
        <div>
            <h2>Categories</h2>
            <input placeholder="Search categories" onChange={handleFilterChange} value={searchQuery}></input>
            <div>
                <ToggleButtonGroup
                    value={selectedCategory}
                    exclusive
                    onChange={handleCategoryChange}
                    aria-label="category selection"
                >
                    {filteredCategories.map(category => (
                        <CustomToggleButton key={category.id} value={category.id} >
                            <img src={`./img/${category.imageUrl}`} className="itemIcon"></img>
                            <p>{category.name}</p>
                        </CustomToggleButton>
                    ))}
                </ToggleButtonGroup>
                <Products products={filteredProducts} />
            </div>
        </div>        
    );
};