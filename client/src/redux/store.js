// store.js
import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from '../features/authSlice'; 
import crimeReducer from '../features/crimeSlice'; 
import policeReducer from '../features/policeSlice'; // Import policeReducer

const store = configureStore({ 
  reducer: { 
    auth: authReducer, 
    crime: crimeReducer, 
    police: policeReducer,
  }, 
}); 

export default store; 
