// File: Frontend/frontend.client/src/services/categoryService.ts

import axios from 'axios';
import { CategoryDto } from '../DTOs/CategoryDto';
import { getAuthHeaders } from '../utils/authUtils';

const apiUrl = (baseUrl: string) => `${baseUrl}/api/Categories`;

export const fetchCategories = async (baseUrl: string): Promise<CategoryDto[]> => {
    const response = await axios.get<CategoryDto[]>(apiUrl(baseUrl), {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const createCategory = async (baseUrl: string, newCategory: CategoryDto): Promise<void> => {
    await axios.post(apiUrl(baseUrl), newCategory, {
        headers: getAuthHeaders()
    });
};

export const updateCategory = async (baseUrl: string, updatedCategory: CategoryDto): Promise<void> => {
    await axios.put(`${apiUrl(baseUrl)}/${updatedCategory.id}`, updatedCategory, {
        headers: getAuthHeaders()
    });
};

export const deleteCategory = async (baseUrl: string, id: number): Promise<void> => {
    await axios.delete(`${apiUrl(baseUrl)}/${id}`, {
        headers: getAuthHeaders()
    });
};
