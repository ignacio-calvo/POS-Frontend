export const getToken = (): string | null => {
    return localStorage.getItem('jwtToken');
};

export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};