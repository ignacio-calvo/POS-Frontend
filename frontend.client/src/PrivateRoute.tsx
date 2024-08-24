import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('jwtToken');
    const location = useLocation();

    return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
