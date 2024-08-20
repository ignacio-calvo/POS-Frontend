import axios from 'axios';

const AUTH_API_URL: string = import.meta.env.VITE_AUTH_API_URL || "";
const loginUrl = `${AUTH_API_URL}/identity/login`;
const CUSTOMER_REGISTRATION_API_URL: string = import.meta.env.VITE_CUSTOMER_REGISTRATION_API_URL || "";
const registerUrl = `${CUSTOMER_REGISTRATION_API_URL}/CustomerRegistration/register`;
interface RegisterResponse {
    Message: string;
}

export const login = async (email: string, password: string): Promise<void> => {
    try {
        const response = await axios.post(loginUrl, { email, password });
        const token = response.data.token;
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = (): void => {
    localStorage.removeItem('jwtToken');
};

export const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(registerUrl, {
            email,
            password,
            firstName,
            lastName
        });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
