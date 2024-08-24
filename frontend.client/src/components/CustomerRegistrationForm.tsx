import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { register, login } from '../services/authService';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomerRegistrationForm: React.FC = () => {
    const { t } = useTranslation('CustomerRegistrationForm');
    const [open, setOpen] = React.useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
    const [severity, setSeverity] = React.useState<'success' | 'error'>('success');
    const navigate = useNavigate();
    

    const validationSchema = yup.object({
        firstName: yup.string().required(t('lastNameRequired')),
        lastName: yup.string().required(t('lastNameRequired')),
        email: yup.string().email(t('emailInvalid')).required(t('emailRequired')),
        password: yup.string()
            .min(6, t('passwordLength'))
            .matches(/[A-Z]/, t('passwordUppercase'))
            .matches(/[a-z]/, t('passwordLowercase'))
            .matches(/\d/, t('passwordNumber'))
            .matches(/[@$!%*?&#]/, t('passwordSpecial'))
            .required(t('passwordRequired')),
        repeatPassword: yup.string()
            .oneOf([yup.ref('password'), null], t('passwordMatch'))
            .required(t('passwordRepeatRequired'))
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await register(values.firstName, values.lastName, values.email, values.password);
                setSnackbarMessage(t('registrationSuccessful'));
                setSeverity('success');
                setOpen(true);

                // Authenticate the user after successful registration
                await login(values.email, values.password);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setSnackbarMessage(error.response?.data?.Message || t('errorOcurred'));
                    setSeverity('error');
                    setOpen(true);
                } else {
                    setSnackbarMessage(t('errorOcurred'));
                    setSeverity('error');
                    setOpen(true);
                }
            }
        }
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <h2>{t('title')}</h2>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label={t('firstName')}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label={t('lastName')}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label={t('email')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label={t('password')}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="repeatPassword"
                    name="repeatPassword"
                    label={t('repeatPassword')}
                    type="password"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                    helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                    margin="normal"
                />
                <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                    {t('register')}
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomerRegistrationForm;

