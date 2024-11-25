import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import DynamicBreadcrumbs from '../layout/Breadcrumb';
import Layout from '../layout/Layout';

const Dashboard = () => {
  return (
    <Layout title="Dashboard" description="Welcome to the Uttar Pradesh Police website">
    <Container maxWidth="lg" style={{ marginTop: '5rem', textAlign: 'center' }}>
      <DynamicBreadcrumbs />
      <Typography variant="h4" gutterBottom>
        Police Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Welcome to the UP Police Crime Management Dashboard. Here, you can manage and register crime records, lodge an FIR, find the nearest police station, and know your assigned officers.
      </Typography>

      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to="/dashboard/register-crime"
              >
                Register New Crime
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={Link}
                to="/search"
              >
                Search Crime Records
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                component={Link}
                to="/dashboard/view-crimes"
              >
                View Crime Records
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to="/dashboard/lodge-fir"
              >
                Lodge an e-FIR
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                component={Link}
                to="/dashboard/find-station"
              >
                Find Nearest Police Station
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Button
                fullWidth
                variant="contained"
                color="info"
                component={Link}
                to="/dashboard/know-your-police"
              >
                Know Your Police
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  );
};

export default Dashboard;
