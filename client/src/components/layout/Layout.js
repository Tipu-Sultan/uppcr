import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container, Box } from '@mui/material';

const Layout = ({ title, description, children }) => {
  return (
    <>
      {/* Dynamic Title and Description using Helmet */}
      <Helmet>
        <title>{title ? `${title} | UP Police` : 'UP Police'}</title>
        <meta name="description" content={description || 'UP Police official website'} />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Container maxWidth="lg" style={{ marginTop: '5rem' }}>
        <Box my={4}>{children}</Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
