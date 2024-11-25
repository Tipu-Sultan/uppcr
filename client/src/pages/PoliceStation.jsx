import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoliceDistrict, fetchPoliceStations, clearPoliceStations } from '../features/policeSlice';
import Layout from '../components/layout/Layout';

const PoliceStationFilter = () => {
  const { policeStations, district, loading, error } = useSelector((state) => state.police);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  
  const dispatch = useDispatch();

  const handleDistrictChange = (event) => {
    const newDistrictId = event.target.value;
    setSelectedDistrictId(newDistrictId);
    dispatch(clearPoliceStations());
  };

  useEffect(() => {
    dispatch(fetchPoliceDistrict());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDistrictId) {
      dispatch(fetchPoliceStations(selectedDistrictId));
    }
  }, [dispatch, selectedDistrictId]);

  return (
    <Layout title="Find your police stations" description="Welcome to the Uttar Pradesh Police website">
    <Box maxWidth="md" mx={'auto'} sx={{ mt: 5, p: 3, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <DynamicBreadcrumbs />
      <Typography variant="h5" align="center" gutterBottom>
        Filter Police Stations
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="district-label">District</InputLabel>
        <Select
          labelId="district-label"
          value={selectedDistrictId}
          onChange={handleDistrictChange}
          variant="outlined"
          sx={{ backgroundColor: '#fff' }}
        >
          {district?.map((district) => (
            <MenuItem key={district._id} value={district._id}>
              {district.districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {loading && <CircularProgress sx={{ display: 'block', margin: '0 auto', mb: 2 }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Typography variant="h5" align="center" gutterBottom>
        Police Stations - Total= {policeStations?.length}
      </Typography>
      <Grid container spacing={2}>
        {policeStations?.map((station) => (
          <Grid item xs={12} sm={6} md={4} key={station.id}>
            <Card sx={{ minHeight: '100px' }}>
              <CardContent>
                <Typography variant="h7" component="div">
                  {station.policeStationName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Code: {station.code}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Layout>
  );
};

export default PoliceStationFilter;
