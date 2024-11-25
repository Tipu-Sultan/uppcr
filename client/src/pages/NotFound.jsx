import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '5rem' }}>
      <Typography variant="h3" gutterBottom color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Sorry, the page you're looking for doesn't exist. Please go back to the home page.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
