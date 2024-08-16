import { FC, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { CustomerDto } from '../DTOs/CustomerDto';
import { Fab, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';

interface CustomerComponentProps {
    baseUrl: string;
}

const FloatingActionButton = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

export const CustomerComponent: FC<CustomerComponentProps> = ({ baseUrl }) => {
    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [customer, setCustomer] = useState<Partial<CustomerDto>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const apiUrl = `${baseUrl}/api/customers`;

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<CustomerDto[]>(apiUrl);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await updateCustomer(customer as CustomerDto);
                setSnackbar({ open: true, message: 'Customer updated successfully', severity: 'success' });
            } else {
                await createCustomer(customer as CustomerDto);
                setSnackbar({ open: true, message: 'Customer created successfully', severity: 'success' });
            }
            setCustomer({});
            setIsEditing(false);
            setIsDrawerOpen(false);
            fetchCustomers();
        } catch (error) {
            console.error('Error submitting customer:', error);
            setSnackbar({ open: true, message: 'Error submitting customer', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const createCustomer = async (newCustomer: CustomerDto) => {
        try {
            await axios.post(apiUrl, newCustomer);
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    };

    const updateCustomer = async (updatedCustomer: CustomerDto) => {
        try {
            await axios.put(`${apiUrl}/${updatedCustomer.id}`, updatedCustomer);
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;
        }
    };

    const deleteCustomer = async (id: number) => {
        setLoading(true);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        } finally {
            setLoading(false);
        }
    };

    const editCustomer = (customer: CustomerDto) => {
        setCustomer(customer);
        setIsEditing(true);
        setIsDrawerOpen(true);
    };

    const openCreateDrawer = () => {
        setCustomer({});
        setIsEditing(false);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <h2>Customers</h2>
            <FloatingActionButton color="primary" onClick={openCreateDrawer}>
                <Add />
            </FloatingActionButton>
            <CustomerForm
                customer={customer}
                isEditing={isEditing}
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
            />
            <CustomerTable customers={customers} onEdit={editCustomer} onDelete={deleteCustomer} />
            <Backdrop open={loading} style={{ zIndex: 1300 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};
