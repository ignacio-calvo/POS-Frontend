import axios from 'axios';
import { CustomerDto } from '../DTOs/CustomerDto';
import { getAuthHeaders } from '../utils/authUtils';

const apiUrl = (baseUrl: string) => `${baseUrl}/api/customers`;

export const fetchCustomers = async (baseUrl: string): Promise<CustomerDto[]> => {
    const response = await axios.get<CustomerDto[]>(apiUrl(baseUrl), {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const createCustomer = async (baseUrl: string, newCustomer: CustomerDto): Promise<void> => {
    await axios.post(apiUrl(baseUrl), newCustomer, {
        headers: getAuthHeaders()
    });
};

export const updateCustomer = async (baseUrl: string, updatedCustomer: CustomerDto): Promise<void> => {
    await axios.put(`${apiUrl(baseUrl)}/${updatedCustomer.id}`, updatedCustomer, {
        headers: getAuthHeaders()
    });
};

export const fetchCustomerByEmail = async (baseUrl: string, email: string): Promise<CustomerDto> => {
    const response = await axios.get<CustomerDto>(`${apiUrl(baseUrl)}/email/${email}`, {
        headers: getAuthHeaders()
    });
    return response.data;
};
