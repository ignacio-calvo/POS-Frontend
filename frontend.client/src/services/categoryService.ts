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