import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../features/authSlice';
import { useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Layout from '../layout/Layout';

const VerifyEmail = () => {
  const { token } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { loading,error } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await dispatch(verifyEmail(token)).unwrap();
        enqueueSnackbar('Email verified successfully!', {
          variant: 'success',
          action: (key) => (
            <button
              onClick={() => closeSnackbar(key)}
              className="text-white bg-transparent hover:bg-gray-700 rounded-full p-1"
            >
              ✕
            </button>
          ),
        });
      } catch (error) {
        enqueueSnackbar(error || 'An error occurred', {
          variant: 'error',
          action: (key) => (
            <button
              onClick={() => closeSnackbar(key)}
              className="text-white bg-transparent hover:bg-gray-700 rounded-full p-1"
            >
              ✕
            </button>
          ),
        });
      }
    };

    verifyUserEmail();
  }, [dispatch, enqueueSnackbar, token, closeSnackbar]);

  return (
    <Layout title="Verification" description="Welcome to the Uttar Pradesh Police website">
      <div className="max-w-md mx-auto mt-20 text-center p-6 bg-white rounded-lg shadow-md">
        {loading && <div className="loader">Loading...</div>}
        
        {!error && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Email verified successfully!</h2>
            <p>You can now log in.</p>
            <Link to="/login" className="text-blue-600 underline">
              Login as Police Inspector
            </Link>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Verification failed.</h2>
            <p>The link may be invalid or expired.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VerifyEmail;
