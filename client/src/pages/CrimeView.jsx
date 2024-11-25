import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Paper, Button, Select, MenuItem, FormControl, InputLabel, Chip, Grid, CircularProgress } from '@mui/material';
import { printDocument } from '../services/printDoc';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import { deleteCrime, updateCrimeStatus } from '../features/crimeSlice'; 
import Layout from '../components/layout/Layout';

const CrimeView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the crimeId from the URL
  const dispatch = useDispatch();
  const { crimeRecords, status } = useSelector((state) => state.crime); 

  // Find the crime record based on the crimeId
  const crime = crimeRecords.find((record) => record._id === id);
  const [crimeStatus, setCrimeStatus] = useState('pending');

  useEffect(() => {
    if (crime) {
      setCrimeStatus(crime.crimeStatus); // Set crimeStatus when crime is available
    }
  }, [crime]);

  if (!crime) {
    return (
      <Container>
        <Typography variant="h5" align="center" gutterBottom>
          Crime record not found.
        </Typography>
      </Container>
    );
  }

  const handleStatusChange = (event) => {
    setCrimeStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    dispatch(updateCrimeStatus({ id, crimeStatus }));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this crime record?");
    if (confirmDelete) {
      const resultAction = await dispatch(deleteCrime(id));
      if (deleteCrime.fulfilled.match(resultAction)) {
        navigate('/dashboard/view-crimes');
      } else {
        console.error('Failed to delete crime record');
      }
    }
  };

  // Define status colors
  const statusColors = {
    pending: 'default',
    inCourt: 'error',
    trial: 'warning',
    atPoliceStation: 'info',
    clear: 'success',
  };

  return (
    <Layout title="Crime Details" description="Welcome to the Uttar Pradesh Police website">
      <Container maxWidth="md" style={{ marginTop: '2rem', padding: '2rem', border: '1px solid black', borderRadius: '5px' }}>
        <DynamicBreadcrumbs />
        <Typography variant="h4" align="center" gutterBottom>
          Crime Details
        </Typography>

        <Paper style={{ padding: '20px', margin: '10px', border: '1px solid gray' }}>
          <Grid container spacing={2}>
            {/* Crime Number */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Crime Number: {crime.crimeNumber}</Typography>
            </Grid>
            
            {/* Crime Status */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                Status: 
                <Chip 
                  label={crime.crimeStatus} 
                  color={statusColors[crime.crimeStatus]} 
                  style={{ marginLeft: '10px' }} 
                />
              </Typography>
            </Grid>
            
            {/* Suspect Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Suspect Name: {`${crime.firstName} ${crime.middleName || ''} ${crime.lastName}`.trim()}</Typography>
            </Grid>

            {/* Crime Type */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Crime Type: {crime.crimeType}</Typography>
            </Grid>

            {/* Police Station */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Police Station: {crime.policeStation}</Typography>
            </Grid>

            {/* Crime Date */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Date: {new Date(crime.crimeDate).toLocaleDateString()}</Typography>
            </Grid>

            {/* Registered By */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                Registered By: {`${crime.registeredBy?.firstName} ${crime?.registeredBy?.lastName}`}
              </Typography>
            </Grid>

            {/* Crime Status Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Crime Status</InputLabel>
                <Select value={crimeStatus} onChange={handleStatusChange}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inCourt">In Court</MenuItem>
                  <MenuItem value="trial">Trial</MenuItem>
                  <MenuItem value="atPoliceStation">At Police Station</MenuItem>
                  <MenuItem value="clear">Clear</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleUpdateStatus} style={{ marginRight: '10px' }}>
                {status === 'updateStatus' ? <CircularProgress size={24} color="inherit" /> : 'Update Status'}
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginRight: '10px' }}>
                {status === 'deleteStatus' ? <CircularProgress size={24} color="inherit" /> : 'Delete Record'}
              </Button>
              <Button variant="contained" color="primary" onClick={() => printDocument()} style={{ marginRight: '10px' }}>
                Print
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CrimeView;
