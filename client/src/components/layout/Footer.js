import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '2rem 0',
        marginTop: '5rem',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Important Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Important Links
            </Typography>
            <Link href="#" color="textPrimary" underline="none" display="block" gutterBottom>
              Home
            </Link>
            <Link href="#" color="textPrimary" underline="none" display="block" gutterBottom>
              Crime Reporting
            </Link>
            <Link href="#" color="textPrimary" underline="none" display="block" gutterBottom>
              Public Safety
            </Link>
            <Link href="#" color="textPrimary" underline="none" display="block" gutterBottom>
              Contact Us
            </Link>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Uttar Pradesh Police Headquarters, Lucknow
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: +91-1234-567890
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: contact@uppolice.gov.in
            </Typography>
          </Grid>

          {/* Disclaimer Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="textSecondary">
              The information provided on this website is for general informational purposes only. 
              While we strive to keep the content accurate and up-to-date, it is not intended as a substitute 
              for professional advice or services.
            </Typography>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Uttar Pradesh Police. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
