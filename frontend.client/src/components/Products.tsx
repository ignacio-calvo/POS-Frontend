import { FC, useState, ChangeEvent } from 'react';
import { Product } from './Product';
import { ProductDto } from '../DTOs/ProductDto';

interface Props {    
    products: ProductDto[];
}

export const Products: FC<Props> = ({ products }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Products</h2>
            <input placeholder="Search products" onChange={handleFilterChange} value={searchQuery}></input>
            <div>
            {filteredProducts.map(product => (
                    
                    <Product id={product.id} name={product.name} productImageUrl={product.productImageUrl} sizes={product.sizes}></Product>
                    
            ))}
            </div>
        </div>        
    );
};