import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const registerInspector = createAsyncThunk('auth/register', authService.register);
export const loginInspector = createAsyncThunk('auth/login', authService.login);
export const verifyEmail = createAsyncThunk('auth/verifyEmail', authService.verifyEmail);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', false);
      localStorage.removeItem('token');
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', true);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerInspector.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = null; // Clear any previous error
      })
      .addCase(registerInspector.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(loginInspector.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(loginInspector.rejected, (state, action) => {
        state.error = action.payload;;
        state.status = 'rejected';
        state.isAuthenticated = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = 'verified';
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
