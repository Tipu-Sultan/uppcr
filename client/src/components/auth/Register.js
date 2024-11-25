import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerInspector } from '../../features/authSlice';
import { TextField, Button, Container, Typography, Box, Link, CircularProgress, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { closeSnackbar, useSnackbar } from 'notistack';
import Layout from '../layout/Layout';

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ policeId: '', firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!formData.policeId) newErrors.policeId = "Police ID is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
  
    try {
      const response = await dispatch(registerInspector(formData)).unwrap();
      enqueueSnackbar(response.message, { variant: 'success' });
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
    <Layout title="Signup" description="Welcome to the Uttar Pradesh Police website">
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Police Inspector Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        {['policeId', 'firstName', 'lastName', 'email', 'phone', 'password'].map((field) => (
          <TextField
            key={field}
            fullWidth
            margin="normal"
            name={field}
            label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // Capitalize label
            onChange={handleChange}
            variant="outlined"
            error={Boolean(errors[field])} // Display error style if field has an error
            helperText={errors[field]} // Show error message below the field
          />
        ))}
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </Box>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Already registered?{' '}
          <Link component={RouterLink} to="/login" color="primary">
            Login as Police Inspector
          </Link>
        </Typography>
      </Box>
    </Container>
    </Layout>
  );
};

export default Register;
