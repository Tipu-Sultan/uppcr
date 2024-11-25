import React, { useState, useMemo } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, IconButton, CircularProgress, Chip } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { fetchCrimeByNumber } from '../features/crimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, useSnackbar } from 'notistack';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import Layout from '../components/layout/Layout';

const CrimeSearch = () => {
  const [crimeNumber, setCrimeNumber] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { error, selectedCrime, status } = useSelector((state) => state.crime);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await dispatch(fetchCrimeByNumber(crimeNumber)).unwrap();
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} color="inherit">
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  };

  // Calculate the count of each crimeStatus
  const crimeStatusCounts = useMemo(() => {
    const counts = { pending: 0, inCourt: 0, trial: 0, atPoliceStation: 0, clear: 0 };
    selectedCrime.forEach((record) => {
      counts[record.crimeStatus] = (counts[record.crimeStatus] || 0) + 1;
    });
    return counts;
  }, [selectedCrime]);

  // Define colors for each crimeStatus
  const statusColors = {
    pending: 'default',
    inCourt: 'error',
    trial: 'warning',
    atPoliceStation: 'info',
    clear: 'success',
  };

  return (
    <Layout title="Search" description="Welcome to the Uttar Pradesh Police website">

    <Container maxWidth="md" sx={{ mt: 5 }}>
      <DynamicBreadcrumbs />
      <Typography variant="h4" align="center" gutterBottom>
        Crime Record Search
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          margin="normal"
          label="Enter Crime Number"
          value={crimeNumber.toUpperCase()}
          onChange={(e) => setCrimeNumber(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {status === 'loading' ? <CircularProgress size={24} color="inherit" /> : 'Search Crime'}
        </Button>
      </form>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {selectedCrime.length > 0 && (
  <Box mt={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
    <Typography variant="h6" textAlign="center">Crime Record Details</Typography>

    {/* Display status counts */}
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-around" mt={2} mb={4}>
      {Object.entries(crimeStatusCounts).map(([status, count]) => (
        <Box key={status} textAlign="center" sx={{ mb: { xs: 2, sm: 0 } }}> {/* Margin bottom for mobile */}
          <Chip
            label={`${status.charAt(0).toUpperCase() + status.slice(1)}: ${count}`}
            color={statusColors[status]}
            variant="outlined"
          />
        </Box>
      ))}
    </Box>

    {/* Display individual crime records */}
    <Grid container spacing={2}>
      {selectedCrime.map((record, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ borderBottom: '1px solid #eee', mb: 2, pb: 2 }}>
          <Typography variant="body1">
            <strong>Crime Number:</strong> {record.crimeNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Suspect Name:</strong> {`${record.firstName} ${record.middleName || ''} ${record.lastName}`.trim()}
          </Typography>
          <Typography variant="body1">
            <strong>Crime Type:</strong> {record.crimeType}
          </Typography>
          <Typography variant="body1">
            <strong>Police Station:</strong> {record.policeStation}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {new Date(record.crimeDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {record.description}
          </Typography>
          <Typography variant="body1">
            <strong>Registered By:</strong> {record?.registeredBy?.firstName + ' ' + record?.registeredBy?.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>First Time Offender:</strong> {record.isFirstTimeOffender ? 'Yes' : 'No'}
          </Typography>
          <Box mt={1}>
            <Chip label={record.crimeStatus} color={statusColors[record.crimeStatus]} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
)}
    </Container>
</Layout>
  );
};

export default CrimeSearch;
