import axios from 'axios';
import { CategoryDto } from '../DTOs/CategoryDto';

const apiUrl = (baseUrl: string) => `${baseUrl}/api/Categories`;

export const fetchCategorys = async (baseUrl: string): Promise<CategoryDto[]> => {
    const response = await axios.get<CategoryDto[]>(apiUrl(baseUrl));
    return response.data;
};

export const createCategory = async (baseUrl: string, newCategory: CategoryDto): Promise<void> => {
    await axios.post(apiUrl(baseUrl), newCategory);
};

export const updateCategory = async (baseUrl: string, updatedCategory: CategoryDto): Promise<void> => {
    await axios.put(`${apiUrl(baseUrl)}/${updatedCategory.id}`, updatedCategory);
};

export const deleteCategory = async (baseUrl: string, id: number): Promise<void> => {
    await axios.delete(`${apiUrl(baseUrl)}/${id}`);
};
