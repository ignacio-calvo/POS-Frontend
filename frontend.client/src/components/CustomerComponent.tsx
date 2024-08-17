import { FC, useState, useEffect, useCallback } from 'react';
import { Fab, Backdrop, CircularProgress, Snackbar, Alert, TextField, InputAdornment } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';
import { CustomerDto } from '../DTOs/CustomerDto';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/customerService';

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
    const [filteredCustomers, setFilteredCustomers] = useState<CustomerDto[]>([]);
    const [customer, setCustomer] = useState<Partial<CustomerDto>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCustomersData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchCustomers(baseUrl);
            setCustomers(data);
            setFilteredCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    useEffect(() => {
        fetchCustomersData();
    }, [fetchCustomersData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await updateCustomer(baseUrl, customer as CustomerDto);
                setSnackbar({ open: true, message: 'Customer updated successfully', severity: 'success' });
            } else {
                await createCustomer(baseUrl, customer as CustomerDto);
                setSnackbar({ open: true, message: 'Customer created successfully', severity: 'success' });
            }
            setCustomer({});
            setIsEditing(false);
            setIsDrawerOpen(false);
            fetchCustomersData();
        } catch (error) {
            console.error('Error submitting customer:', error);
            setSnackbar({ open: true, message: 'Error submitting customer', severity: 'error' });
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = customers.filter(customer =>
            customer.firstName.toLowerCase().includes(query) ||
            customer.lastName.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query)
        );
        setFilteredCustomers(filtered);
    };

    return (
        <div>
            <h2>Customers</h2>
            <TextField
                label="Search Customers"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                margin="normal"
            />
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
            <CustomerTable customers={filteredCustomers} onEdit={editCustomer} onDelete={(id) => deleteCustomer(baseUrl, id).then(fetchCustomersData)} />
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
