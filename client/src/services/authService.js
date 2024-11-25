import api from './api';

const register = async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Registration failed');
  }
};

const login = async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Login failed');

  }
};

const verifyEmail = async (token, { rejectWithValue }) => {
  try {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
}
const authService = { register, login, verifyEmail };
export default authService;
