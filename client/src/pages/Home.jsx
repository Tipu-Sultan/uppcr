import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bannerImage from '../assets/upp.png';
import Layout from '../components/layout/Layout';

const Home = () => {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) ||
    localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Layout title="Home" description="Welcome to the Uttar Pradesh Police website">

    <Container maxWidth="lg" style={{ marginTop: '5rem' }}>
      <Grid container spacing={4}>
        {/* Left-side aside for related services and notifications */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '1rem', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              सेवाएं और अधिसूचनाएं / Services & Notifications
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle1" color="primary">
                🔔 नई सूचना / New Notification
              </Typography>
              <Typography variant="body2" color="textSecondary">
                हाल ही की अधिसूचनाएं यहाँ उपलब्ध हैं / Recent notifications are available here.
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="subtitle1" color="primary">
                🗺️ नजदीकी पुलिस स्टेशन सेवाएं / Nearest Police Station Services
              </Typography>
              <Typography variant="body2" color="textSecondary">
                आप अपने नजदीकी पुलिस स्टेशन की जानकारी प्राप्त कर सकते हैं / Find information about your nearest police station.
              </Typography>
            </Box>
            {/* Add more sections as needed */}
          </Paper>
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={8}>
          <Box textAlign="center">
            <img
              src={bannerImage}
              alt="UP Police Banner"
              style={{ width: '40%', height: '20%', borderRadius: '8px', marginBottom: '2rem' }}
            />
            <Typography variant="h3" gutterBottom>
              UP Police Crime Records Portal
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
              Welcome to the UP Police Crime Records Portal. Here, the public can search for available crime records,
              and authorized police personnel can log in to manage crime records securely.
            </Typography>
            <Box mt={4}>
              <Button variant="contained" color="primary" component={Link} to="/search" style={{ marginRight: '1rem' }}>
                Search Crime Records
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/dashboard/find-station" style={{ marginRight: '1rem' }}>
                Find Nearest Police Stations
              </Button>
              {!isAuthenticated && (
                <Button variant="outlined" color="primary" component={Link} to="/login">
                  Police Login
                </Button>
              )}
            </Box>
          </Box>
        </Grid>

      </Grid>
    </Container>
</Layout>
  );
};

export default Home;
