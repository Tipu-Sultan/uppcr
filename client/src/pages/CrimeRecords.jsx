import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    IconButton,
    Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import locationData from '../services/up-area.json';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCrimes } from '../features/crimeSlice';
import { closeSnackbar, useSnackbar } from 'notistack';
import DynamicBreadcrumbs from '../components/layout/Breadcrumb';
import Layout from '../components/layout/Layout';

const CrimeRecords = () => {
    const [district, setDistrict] = useState('');
    const [tehsil, setTehsil] = useState('');
    const [policeStation, setThana] = useState('');
    const [tehsilOptions, setTehsilOptions] = useState([]);
    const [thanaOptions, setThanaOptions] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { crimeRecords, loading, error } = useSelector((state) => state.crime);

    const handleFetchCrimeRecords = async () => {
        try {
            await dispatch(fetchAllCrimes({ district, tehsil, policeStation })).unwrap();
        } catch (error) {
            enqueueSnackbar(error || 'Failed to fetch crime records', {
                variant: 'error',
                action: (key) => (
                    <IconButton onClick={() => closeSnackbar(key)} color="inherit">
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    };
    

    useEffect(() => {
        if (district) {
            const selectedDistrict = locationData.find(d => d.district === district);
            setTehsilOptions(selectedDistrict ? selectedDistrict.tehsils.map(t => t.name) : []);
            setTehsil('');
            setThana('');
            setThanaOptions([]);
        }
    }, [district]);

    useEffect(() => {
        if (tehsil && district) {
            const selectedDistrict = locationData.find(d => d.district === district);
            const selectedTehsil = selectedDistrict?.tehsils.find(t => t.name === tehsil);
            setThanaOptions(selectedTehsil ? selectedTehsil.thanas : []);
            setThana('');
        }
    }, [tehsil, district]);

    // Define colors for each crimeStatus
  const statusColors = {
    pending: 'default',
    inCourt: 'error',
    trial: 'warning',
    atPoliceStation: 'info',
    clear: 'success',
  };

    return (
        <Layout title="Records" description="Welcome to the Uttar Pradesh Police website">

        <Container maxWidth="lg" style={{ marginTop: '5rem' }}>
            <DynamicBreadcrumbs />
            <Typography variant="h4" align="center" gutterBottom>
                View Crime Records
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        select
                        label="District"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    >
                        {locationData.map((district, index) => (
                            <MenuItem key={index} value={district.district}>
                                {district.district}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        select
                        label="Tehsil"
                        value={tehsil}
                        onChange={(e) => setTehsil(e.target.value)}
                        fullWidth
                        disabled={!district}
                    >
                        {tehsilOptions.map((tehsilName, index) => (
                            <MenuItem key={index} value={tehsilName}>
                                {tehsilName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        select
                        label="Thana"
                        value={policeStation}
                        onChange={(e) => setThana(e.target.value)}
                        disabled={!tehsil}
                    >
                        {thanaOptions.map((thanaName) => (
                            <MenuItem key={thanaName} value={thanaName}>
                                {thanaName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleFetchCrimeRecords}>
                Filter
            </Button>

            {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {loading ? (
                <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                    Loading...
                </Typography>
            ) : (
                <TableContainer  style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Crime Number</TableCell>
                                <TableCell>Suspect Name</TableCell>
                                <TableCell>Crime Type</TableCell>
                                <TableCell>Police Station</TableCell>
                                <TableCell>Crime Status</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {crimeRecords.map((crime) => (
                                <TableRow key={crime._id}>
                                    <TableCell>{crime.crimeNumber}</TableCell>
                                    <TableCell>{`${crime.firstName} ${crime.middleName || ''} ${crime.lastName}`.trim()}</TableCell>
                                    <TableCell>{crime.crimeType}</TableCell>
                                    <TableCell>{crime.policeStation}</TableCell>
                                    <TableCell>
                                    <Chip label={crime.crimeStatus} color={statusColors[crime.crimeStatus]} />
                                    </TableCell>
                                    <TableCell>{new Date(crime.crimeDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button component={RouterLink} to={`/dashboard/view-crimes/view/${crime._id}`} variant="contained" color="primary" style={{ marginRight: '5px' }}>
                                            View
                                        </Button>
                                        <Button component={RouterLink} to={`/dashboard/view-crimes/edit/${crime._id}`} variant="contained" color="secondary">
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
        </Layout>
    );
};

export default CrimeRecords;
