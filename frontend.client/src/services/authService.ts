import axios from 'axios';

const AUTH_API_URL: string = import.meta.env.VITE_AUTH_API_URL || "";
const loginUrl = `${AUTH_API_URL}/identity/login`;
const CUSTOMER_IDENTITY_API_URL: string = import.meta.env.VITE_CUSTOMER_IDENTITY_API_URL || "";
const googleLoginUrl = `${CUSTOMER_IDENTITY_API_URL}/CustomerIdentity/google-login`;
const registerUrl = `${CUSTOMER_IDENTITY_API_URL}/CustomerIdentity/register`;

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

export const loginWithGoogle = async (token: string): Promise<void> => {
    try {
        const response = await axios.post(googleLoginUrl, { token });
        const jwtToken = response.data.token;
        if (jwtToken) {
            localStorage.setItem('jwtToken', jwtToken);
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Error during Google login:', error);
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
