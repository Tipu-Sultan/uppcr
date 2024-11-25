// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated =
  useSelector((state) => state.auth.isAuthenticated) ||
  localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
