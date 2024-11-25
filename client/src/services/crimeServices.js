import api from './api';

export const registerCrime = async (crimeData, { rejectWithValue }) => {
    try {
        const response = await api.post('/crime/register', crimeData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.error || 'Failed to register crime');

    }
};

// crimeService.js
export const fetchAllCrimes = async (filters, { rejectWithValue }) => {
    const { district, tehsil, policeStation } = filters;
    try {
        const queryParams = new URLSearchParams();
        if (district) queryParams.append('district', district);
        if (tehsil) queryParams.append('tehsil', tehsil);
        if (policeStation) queryParams.append('policeStation', policeStation);

        const response = await api.get(`/crime?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.error || 'Failed to find crime');
    }
};


export const fetchCrimeByNumber = async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/crime/getbynumber/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.error || `Failed to find crime by crime number: ${id}`);
    }
};


export const editCrime = async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/crime/updatebyId/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to edit crime');

    }
};

export const updateCrimeStatus = async ({ id, crimeStatus }, { rejectWithValue }) => {
    try {
        // Send the crimeStatus as the body of the request
        const response = await api.put(`/crime/updateStatus/${id}`, { crimeStatus });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to edit crime');
    }
};

export const deleteCrime = async (id, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/crime/delete/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete crime');

    }
};
