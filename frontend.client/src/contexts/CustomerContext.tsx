import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CustomerDto } from '../DTOs/CustomerDto';

interface CustomerContextType {
    customer: CustomerDto;
    setCustomer: (customer: CustomerDto) => void;
    clearCustomer: () => void;
}

export const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const defaultCustomer: CustomerDto = {
    id: 0,
    phoneNumber: '',
    lastName: '',
    firstName: '',
    email: '',
};

const loadCustomerFromStorage = (): CustomerDto => {
    const storedCustomer = localStorage.getItem('customer');
    return storedCustomer ? JSON.parse(storedCustomer) : defaultCustomer;
};

const saveCustomerToStorage = (customer: CustomerDto) => {
    localStorage.setItem('customer', JSON.stringify(customer));
};

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [customer, setCustomerState] = useState<CustomerDto>(loadCustomerFromStorage);

    useEffect(() => {
        saveCustomerToStorage(customer);
    }, [customer]);

    const setCustomer = (customer: CustomerDto) => {
        setCustomerState(customer);
    };

    const clearCustomer = () => {
        setCustomerState(defaultCustomer);
        localStorage.removeItem('customer');
    };

    return (
        <CustomerContext.Provider value={{ customer, setCustomer, clearCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = (): CustomerContextType => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};
