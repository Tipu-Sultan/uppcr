import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchPoliceDistrict = createAsyncThunk(
  'police/fetchDistrict',
  async () => {
    const response = await api.get(`/police/district`);
    return response.data; 
  }
);

export const fetchPoliceStations = createAsyncThunk(
    'police/fetchPoliceStations',
    async (id) => {
      const response = await api.get(`/police/policeStations/${id}`);
      return response.data; 
    }
  );

const policeSlice = createSlice({
  name: 'police',
  initialState: {
    policeStations: [],
    district:[],
    loading: false,
    error: null,
  },
  reducers: {
    clearPoliceStations: (state) => {
      state.policeStations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoliceDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoliceDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.district = action.payload; 
      })
      .addCase(fetchPoliceDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPoliceStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoliceStations.fulfilled, (state, action) => {
        state.loading = false;
        state.policeStations = action.payload; 
      })
      .addCase(fetchPoliceStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ;
  },
});

export const { clearPoliceStations } = policeSlice.actions;
export default policeSlice.reducer;
