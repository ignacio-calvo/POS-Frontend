import axios, { AxiosError } from 'axios';
import { CustomerLoginResponseDto } from '../DTOs/CustomerLoginResponseDto';
import i18n from '../i18n'; // Import the i18n instance

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
            throw new AxiosError(errorMessage || i18n.t('authService.loginFailed', { ns: 'common' }));
        }
        return response.data;
    } catch (error) {
        console.error(i18n.t('authService.loginError', { ns: 'common' }), error);
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
            throw new AxiosError(errorMessage || i18n.t('authService.googleLoginFailed', { ns: 'common' }));
        }
        return response.data;
    } catch (error) {
        console.error(i18n.t('authService.googleLoginError', { ns: 'common' }), error);
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
            throw new AxiosError(errorMessage || i18n.t('authService.registrationFailed', { ns: 'common' }));
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
            throw new AxiosError(i18n.t('authService.userExists', { ns: 'common' }));
        }
        console.error(i18n.t('authService.registrationError', { ns: 'common' }), error);
        throw error;
    }
};
