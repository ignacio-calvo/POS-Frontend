import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomerDto } from '../DTOs/CustomerDto';
import { updateCustomer } from '../services/customerService';
import { useCustomer } from '../contexts/useCustomer';

interface CustomerProfileComponentProps {
    baseUrl: string;
}

const CustomerProfileComponent: React.FC<CustomerProfileComponentProps> = ({ baseUrl }) => {
    const { t } = useTranslation('CustomerProfileComponent');
    const { customer } = useCustomer(); // Use the customer context
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const validationSchema = Yup.object({
        id: Yup.number().required(t('validation.required')),
        phoneNumber: Yup.string().required(t('validation.required')),
        phoneExtension: Yup.string(),
        lastName: Yup.string().required(t('validation.required')),
        firstName: Yup.string().required(t('validation.required')),
        companyName: Yup.string(),
        addressLine1: Yup.string(),
        streetNumber: Yup.string(),
        addressLine2: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        postalCode: Yup.string(),
        email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    });

    const formik = useFormik<CustomerDto>({
        initialValues: {
            id: customer?.id || 0,
            phoneNumber: customer?.phoneNumber || '',
            phoneExtension: customer?.phoneExtension || '',
            lastName: customer?.lastName || '',
            firstName: customer?.firstName || '',
            companyName: customer?.companyName || '',
            addressLine1: customer?.addressLine1 || '',
            streetNumber: customer?.streetNumber || '',
            addressLine2: customer?.addressLine2 || '',
            state: customer?.state || '',
            city: customer?.city || '',
            postalCode: customer?.postalCode || '',
            email: customer?.email || '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true, // Enable reinitialization when customer data changes
        onSubmit: async (values) => {
            try {
                await updateCustomer(baseUrl, values);
                setSnackbarMessage(t('profile.updateSuccess'));
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage(t('profile.updateError'));
                setSnackbarOpen(true);
                console.error(error);
            }
        },
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4">{t('profile.title')}</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label={t('profile.firstName')}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label={t('profile.lastName')}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label={t('profile.email')}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label={t('profile.phoneNumber')}
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="phoneExtension"
                            name="phoneExtension"
                            label={t('profile.phoneExtension')}
                            value={formik.values.phoneExtension}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneExtension && Boolean(formik.errors.phoneExtension)}
                            helperText={formik.touched.phoneExtension && formik.errors.phoneExtension}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="companyName"
                            name="companyName"
                            label={t('profile.companyName')}
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="addressLine1"
                            name="addressLine1"
                            label={t('profile.addressLine1')}
                            value={formik.values.addressLine1}
                            onChange={formik.handleChange}
                            error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                            helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="streetNumber"
                            name="streetNumber"
                            label={t('profile.streetNumber')}
                            value={formik.values.streetNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
                            helperText={formik.touched.streetNumber && formik.errors.streetNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="addressLine2"
                            name="addressLine2"
                            label={t('profile.addressLine2')}
                            value={formik.values.addressLine2}
                            onChange={formik.handleChange}
                            error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                            helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="state"
                            name="state"
                            label={t('profile.state')}
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label={t('profile.city')}
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="postalCode"
                            name="postalCode"
                            label={t('profile.postalCode')}
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                            helperText={formik.touched.postalCode && formik.errors.postalCode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            {t('profile.submit')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};

export default CustomerProfileComponent;
