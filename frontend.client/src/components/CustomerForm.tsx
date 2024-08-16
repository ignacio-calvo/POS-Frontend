import { FC, useState } from 'react';
import { TextField, Drawer, IconButton, AppBar, Toolbar, Typography, Button, InputAdornment } from '@mui/material';
import { ArrowBack, Phone, Email, Business, Home, LocationCity, LocationOn, MailOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface CustomerFormProps {
    customer: Partial<CustomerDto>;
    isEditing: boolean;
    isOpen: boolean;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    overflowY: 'auto',
    height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
}));

const CustomerForm: FC<CustomerFormProps> = ({ customer, isEditing, isOpen, onClose, onChange, onSubmit }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^\d{10}$/; // Simple validation for 10-digit phone numbers
        return phoneRegex.test(phoneNumber);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newErrors: { [key: string]: string } = { ...errors };

        if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Invalid email address';
        } else if (name === 'email') {
            delete newErrors.email;
        }

        if (name === 'phoneNumber' && !validatePhoneNumber(value)) {
            newErrors.phoneNumber = 'Invalid phone number';
        } else if (name === 'phoneNumber') {
            delete newErrors.phoneNumber;
        }

        if ((name === 'firstName' || name === 'lastName') && !value.trim()) {
            newErrors[name] = 'This field is required';
        } else if (name === 'firstName' || name === 'lastName') {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        if (!customer.firstName?.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!customer.lastName?.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!validateEmail(customer.email || '')) {
            newErrors.email = 'Invalid email address';
        }

        if (!validatePhoneNumber(customer.phoneNumber || '')) {
            newErrors.phoneNumber = 'Invalid phone number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onSubmit(e);
        }
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {isEditing ? 'Update Customer' : 'Create Customer'}
                    </Typography>
                    <Button color="inherit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={customer.firstName || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={customer.lastName || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={customer.phoneNumber || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Phone Extension"
                    name="phoneExtension"
                    value={customer.phoneExtension || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={customer.email || ''}
                    onChange={onChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Company Name"
                    name="companyName"
                    value={customer.companyName || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Business />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Address Line 1"
                    name="addressLine1"
                    value={customer.addressLine1 || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Home />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Street Number"
                    name="streetNumber"
                    value={customer.streetNumber || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Home />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={customer.addressLine2 || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Home />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="State"
                    name="state"
                    value={customer.state || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOn />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="City"
                    name="city"
                    value={customer.city || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationCity />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={customer.postalCode || ''}
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline />
                            </InputAdornment>
                        ),
                    }}
                />
            </Form>
        </Drawer>
    );
};

export default CustomerForm;
