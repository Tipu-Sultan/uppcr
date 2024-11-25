// src/features/crimeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as crimeService from '../services/crimeServices';

// Register a new crime
export const registerCrime = createAsyncThunk('crime/register', crimeService.registerCrime);

// Fetch all crimes
export const fetchAllCrimes = createAsyncThunk('crime/fetchAll', crimeService.fetchAllCrimes);

// Fetch a specific crime record by number
export const fetchCrimeByNumber = createAsyncThunk('crime/fetchByNumber', crimeService.fetchCrimeByNumber);

// Edit a crime record
export const editCrime = createAsyncThunk('crime/edit', crimeService.editCrime);

export const updateCrimeStatus = createAsyncThunk('crime/updateStatus', crimeService.updateCrimeStatus);


// Delete a crime record
export const deleteCrime = createAsyncThunk('crime/delete', crimeService.deleteCrime);

const crimeSlice = createSlice({
  name: 'crime',
  initialState: {
    crimeRecords: [],
    selectedCrime: [],
    crimeNumber: null,
    pdfPath: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedCrime: (state) => {
      state.selectedCrime = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCrime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerCrime.fulfilled, (state, action) => {
        state.crimeNumber = action.payload.newCrime.crimeNumber;
        state.pdfPath = action.payload.pdfPath;
        state.status = 'fulfilled';
      })
      .addCase(registerCrime.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
      .addCase(fetchAllCrimes.fulfilled, (state, action) => {
        state.crimeRecords = action.payload;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(fetchAllCrimes.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
        state.crimeRecords = [];

      })
      .addCase(fetchCrimeByNumber.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCrimeByNumber.fulfilled, (state, action) => {
        state.selectedCrime = action.payload;
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(fetchCrimeByNumber.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
        state.selectedCrime = [];
      })
      .addCase(editCrime.fulfilled, (state, action) => {
        const index = state.crimeRecords.findIndex(crime => crime._id === action.payload.crime._id);
        if (index !== -1) {
          state.crimeRecords[index] = action.payload.crime;
        }
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(editCrime.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
      .addCase(updateCrimeStatus.pending, (state, action) => {
        state.status = 'updateStatus';
      })
      .addCase(updateCrimeStatus.fulfilled, (state, action) => {
        const index = state.crimeRecords.findIndex(crime => crime._id === action.payload.updatedCrime._id);
        if (index !== -1) {
          // Update only the crimeStatus of the found crime record
          state.crimeRecords[index].crimeStatus = action.payload.updatedCrime.crimeStatus;
        }
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(updateCrimeStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
      .addCase(deleteCrime.pending, (state, action) => {
        state.status = 'deleteStatus';
      })
      .addCase(deleteCrime.fulfilled, (state, action) => {
        state.crimeRecords = state.crimeRecords.filter(crime => crime._id !== action.payload.crimeId);
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteCrime.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
      });
  },
});

export const { clearSelectedCrime } = crimeSlice.actions;
export default crimeSlice.reducer;
