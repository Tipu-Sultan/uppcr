import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  MenuItem,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';

const LodgeFir = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firNumber: '',
    complainantName: '',
    complainantContact: '',
    incidentLocation: '',
    incidentDate: '',
    incidentTime: '',
    description: '',
    crimeType: '',
    suspectName: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(submitFIR(formData)); // Dispatch action to submit FIR
//       setMessage('e-FIR has been successfully submitted! You will receive a confirmation shortly.');
//     } catch (error) {
//       setMessage('Failed to submit e-FIR. Please check your information and try again.');
//     }
//   };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <DynamicBreadcrumbs />
      <Typography variant="h4" align="center" gutterBottom>
        e-FIR Registration
      </Typography>
      
      {/* UP Police Guidelines for e-FIR */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Important Guidelines for e-FIR Registration
        </Typography>
        <Typography variant="body1">
          - Ensure that all details are accurate and complete to avoid any delays in processing your FIR.
        </Typography>
        <Typography variant="body1">
          - You can register an FIR for non-cognizable offenses online.
        </Typography>
        <Typography variant="body1">
          - For serious crimes (like murder or rape), it is advisable to visit your local police station.
        </Typography>
        <Typography variant="body1">
          - If you have any doubts or queries, please contact your nearest police station for assistance.
        </Typography>
        <Typography variant="body1">
          - The complainant must provide valid contact information to receive updates regarding the FIR.
        </Typography>
        <Typography variant="body1" color="error" sx={{ fontWeight: 'bold' }}>
          झूठी सूचना देने वाले के विरुद्ध कार्यवाही की जाएगी
        </Typography>
        <Typography variant="body1">
          ई-एफ आई आर सुविधा अज्ञात अभियुक्त और नॉन एस आर मामलों के लिये ही उपलब्ध है
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.includes('Failed') ? 'error' : 'success'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Box component="form"  sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="FIR Number"
              name="firNumber"
              value={formData.firNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Complainant Name"
              name="complainantName"
              value={formData.complainantName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="complainantContact"
              value={formData.complainantContact}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Incident Location"
              name="incidentLocation"
              value={formData.incidentLocation}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Incident Date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="time"
              label="Incident Time"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description of Incident"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Crime Type"
              name="crimeType"
              value={formData.crimeType}
              onChange={handleChange}
              select
              required
            >
              <MenuItem value="Theft">Theft</MenuItem>
              <MenuItem value="Assault">Assault</MenuItem>
              <MenuItem value="Fraud">Fraud</MenuItem>
              <MenuItem value="Vandalism">Vandalism</MenuItem>
              {/* Add more options as per UP Police documentation */}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Suspect Name (if known)"
              name="suspectName"
              value={formData.suspectName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit FIR
        </Button>
      </Box>
    </Container>
  );
};

export default LodgeFir;
