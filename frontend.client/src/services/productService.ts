import axios from "axios";
import { ProductDto } from "../DTOs/ProductDto";
import { CategoryDto } from "../DTOs/CategoryDto";

const PRODUCTS_API_URL: string = import.meta.env.VITE_PRODUCTS_API_URL || "";
const productUrl = PRODUCTS_API_URL + '/api/Products'; // returns all products with sizes for each product
const categoriesWithProductsUrl = PRODUCTS_API_URL + '/api/categories/products-sizes'; // returns all categories including products within them and also sizes for each product


export const getProducts = async (): Promise<ProductDto[]> => {
    try {
        const response = await axios.get<ProductDto[]>(productUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getCategoriesWithProducts = async (): Promise<CategoryDto[]> => {
    try {
        const response = await axios.get<CategoryDto[]>(categoriesWithProductsUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching Categories with Products:', error);
        throw error;
    }
};