import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginInspector } from '../../features/authSlice';
import { TextField, Button, Container, Typography, Box, Link, CircularProgress, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { closeSnackbar, useSnackbar } from 'notistack';
import Layout from '../layout/Layout';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginInspector(credentials)).unwrap();
      enqueueSnackbar('Login successfully', { variant: 'success' });
      navigate('/dashboard');
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} color="inherit">
                <CloseIcon />
            </IconButton>
        ),
    });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <Layout title="Login" description="Welcome to the Uttar Pradesh Police website">
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Police Inspector Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          onChange={handleChange}
          variant="outlined"
          error={status === 'error'}
          helperText={status === 'error' && "Invalid email or password"}
        />
        <TextField
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          variant="outlined"
          error={status === 'error'}
          helperText={status === 'error' && "Invalid email or password"}
        />
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          First time here?{' '}
          <Link component={RouterLink} to="/register" color="primary">
            Register as Police Inspector
          </Link>
        </Typography>
      </Box>
    </Container>
    </Layout>
  );
};

export default Login;
