// File: frontend.client/src/services/customerService.ts

import axios from 'axios';
import { CustomerDto } from '../DTOs/CustomerDto';

const apiUrl = (baseUrl: string) => `${baseUrl}/api/customers`;

export const fetchCustomers = async (baseUrl: string): Promise<CustomerDto[]> => {
    const response = await axios.get<CustomerDto[]>(apiUrl(baseUrl));
    return response.data;
};

export const createCustomer = async (baseUrl: string, newCustomer: CustomerDto): Promise<void> => {
    await axios.post(apiUrl(baseUrl), newCustomer);
};

export const updateCustomer = async (baseUrl: string, updatedCustomer: CustomerDto): Promise<void> => {
    await axios.put(`${apiUrl(baseUrl)}/${updatedCustomer.id}`, updatedCustomer);
};

export const deleteCustomer = async (baseUrl: string, id: number): Promise<void> => {
    await axios.delete(`${apiUrl(baseUrl)}/${id}`);
};
