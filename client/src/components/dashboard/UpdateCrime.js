import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Grid, CircularProgress,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editCrime } from '../../features/crimeSlice'; 
import { validateFields } from '../../services/validate';
import { closeSnackbar, useSnackbar } from 'notistack';
import { Close as CloseIcon } from '@mui/icons-material';
import DynamicBreadcrumbs from '../layout/Breadcrumb';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';

const UpdateCrime = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { crimeId } = useParams();
  const { crimeRecords, status } = useSelector((state) => state.crime); 

  const selectedCrime = crimeRecords.find((record) => record._id === crimeId);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    crimeType: '',
    crimeDate: '',
    district: '',
    tehsil: '',
    policeStation: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCrime) {
      const formattedCrimeDate = new Date(selectedCrime.crimeDate).toISOString().split('T')[0]; // Format to yyyy-MM-dd
      setFormData({
        email: selectedCrime.email,
        firstName: selectedCrime.firstName,
        middleName: selectedCrime.middleName || '',
        lastName: selectedCrime.lastName,
        crimeType: selectedCrime.crimeType,
        crimeDate: formattedCrimeDate, // Use the formatted date
        district: selectedCrime.district,
        tehsil: selectedCrime.tehsil,
        policeStation: selectedCrime.policeStation,
        description: selectedCrime.description,
      });
    }
  }, [selectedCrime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleUpdateCrime = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editCrime({ id: crimeId, updatedData: formData })).unwrap();
      enqueueSnackbar(response.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error || 'Failed to update crime', {
        variant: 'error',
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} color="inherit">
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  };
  
  return (
    <Layout title="Dashboard" description="Welcome to the Uttar Pradesh Police website">

    <Container maxWidth="md" sx={{ mt: 5, p: 3, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <DynamicBreadcrumbs />
      <Typography variant="h4" align="center" gutterBottom>
        Update Crime Record
      </Typography>
      <form onSubmit={handleUpdateCrime}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ bgcolor: 'white' }}
            placeholder="xyz@example.com"
          />
        </Grid>
        {/* Suspect Name Fields */}
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="Middle Name (Optional)"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
        </Grid>
        {/* District, Tehsil, Police Station Fields in one row */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              error={!!errors.district}
              helperText={errors.district}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="Tehsil"
              name="tehsil"
              value={formData.tehsil}
              onChange={handleChange}
              error={!!errors.tehsil}
              helperText={errors.tehsil}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              margin="normal"
              label="Police Station"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              error={!!errors.policeStation}
              helperText={errors.policeStation}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          margin="normal"
          label="Crime Type"
          name="crimeType"
          value={formData.crimeType}
          onChange={handleChange}
          error={!!errors.crimeType}
          helperText={errors.crimeType}
          sx={{ bgcolor: 'white' }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Crime Date"
          type="date"
          name="crimeDate"
          InputLabelProps={{ shrink: true }}
          value={formData.crimeDate}
          onChange={handleChange}
          error={!!errors.crimeDate}
          helperText={errors.crimeDate}
          sx={{ bgcolor: 'white' }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ bgcolor: 'white' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Update Crime'}
        </Button>
      </form>
    </Container>
    </Layout>
  );
};

export default UpdateCrime;
