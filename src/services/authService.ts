import axios from 'axios';
import { CustomerLoginResponseDto } from '../DTOs/CustomerLoginResponseDto';

const CUSTOMER_IDENTITY_API_URL: string = import.meta.env.VITE_CUSTOMER_IDENTITY_API_URL || "";
const loginUrl = `${CUSTOMER_IDENTITY_API_URL}/CustomerIdentity/login`;
const googleLoginUrl = `${CUSTOMER_IDENTITY_API_URL}/CustomerIdentity/google-login`;
const registerUrl = `${CUSTOMER_IDENTITY_API_URL}/CustomerIdentity/register`;

export const login = async (email: string, password: string): Promise<CustomerLoginResponseDto> => {
    try {
        const response = await axios.post<CustomerLoginResponseDto>(loginUrl, { email, password });
        const { isSuccess, token, customer, errorMessage } = response.data;
        if (isSuccess && token) {
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('customer', JSON.stringify(customer));
        } else {
            throw new Error(errorMessage || 'Login failed');
        }
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const loginWithGoogle = async (token: string): Promise<CustomerLoginResponseDto> => {
    try {
        const response = await axios.post<CustomerLoginResponseDto>(googleLoginUrl, { token });
        const { isSuccess, token: jwtToken, customer, errorMessage } = response.data;
        if (isSuccess && jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('customer', JSON.stringify(customer));
        } else {
            throw new Error(errorMessage || 'Google login failed');
        }
        return response.data;
    } catch (error) {
        console.error('Error during Google login:', error);
        throw error;
    }
};

export const logout = (): void => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('customer');
};

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): Promise<CustomerLoginResponseDto> => {
    try {
        const response = await axios.post<CustomerLoginResponseDto>(registerUrl, {
            email,
            password,
            firstName,
            lastName
        });
        const { isSuccess, token, customer, errorMessage } = response.data;
        if (isSuccess && token) {
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('customer', JSON.stringify(customer));
        } else {
            throw new Error(errorMessage || 'Registration failed');
        }
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
