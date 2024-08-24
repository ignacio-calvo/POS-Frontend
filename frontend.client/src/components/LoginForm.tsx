import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { login, loginWithGoogle } from '../services/authService';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm: React.FC = () => {
  const { t } = useTranslation('LoginForm');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email(t("enterValidEmail")).required(t('emailRequired')),
    password: yup.string().required(t('passwordRequired'))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        setMessage(t("loginSuccessful"));
        setSeverity('success');
        setOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      } catch {
        setMessage(t("loginFailed"));
        setSeverity('error');
        setOpen(true);
      }
    }
  });

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const googleLogin = useGoogleLogin({
    scope: 'openid email profile',
    onSuccess: async tokenResponse => {
      console.log('Login Success:', tokenResponse);
      try {
        const accessToken = tokenResponse.access_token; 
        console.log('Access Token:', accessToken);

        await loginWithGoogle(accessToken);
        setMessage(t("loginSuccessful"));
        setSeverity('success');
        setOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        console.log('Failed to fetch user info:', error);
        setMessage(t("loginFailed"));
        setSeverity('error');
        setOpen(true);
      }
    },
    onError: error => {
      console.log('Login Failed:', error);
      setMessage(t("loginFailed"));
      setSeverity('error');
      setOpen(true);
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <h2>{t('loginTitle')}</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label={t("email")}
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
          label={t("password")}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
          {t("login")}
        </Button>
      </form>
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        onClick={() => googleLogin()}
        sx={{ mt: 2 }}
      >
        {t("loginWithGoogle")}
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link to="/register">{t("registerLink")}</Link>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
