// hooks/useProductData.ts
import { useState, useEffect } from 'react';
import { getProducts, getCategoriesWithProducts } from '../services/productService';
import { ProductDto } from '../DTOs/ProductDto';
import { CategoryDto } from '../DTOs/CategoryDto';

interface UseProductDataResult {
    products: ProductDto[] | null;
    categories: CategoryDto[] | null;
    loading: boolean;
    error: Error | null;
}

const useProductData = (): UseProductDataResult => {
    const [products, setProducts] = useState<ProductDto[] | null>(null);
    const [categories, setCategories] = useState<CategoryDto[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategoriesWithProducts()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { products, categories, loading, error };
};

export default useProductData;
