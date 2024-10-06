import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // For making the API call

const MetadataRetriever = ({ onMetadataFetched }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for handling API errors

  // Load Rodent 379 data from the Flask API
  const loadRodent379 = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/rodent/379'); // API call for rodent 665 data
      onMetadataFetched(response.data); // Pass the data back to App.js
    } catch (err) {
      setError('Failed to load rodent 379 data.');
      console.error('API Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load Rodent 665 data from the Flask API
  const loadRodent665 = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/rodent/665'); // API call for rodent 665 data
      onMetadataFetched(response.data); // Pass the data back to App.js
    } catch (err) {
      setError('Failed to load rodent 665 data.');
      console.error('API Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch metadata from Flask API
  const fetchMetadataFromAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/metadata'); // API call for Flask metadata
      onMetadataFetched(response.data);
    } catch (err) {
      setError('Failed to fetch metadata from API.');
      console.error('API Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4} mb={4} sx={{ backgroundColor: '#1a1a2e', padding: 4, borderRadius: 2 }}> {/* Dark blue background with padding */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          lineHeight: 1.5,
          color: '#ffffff' // Adjust to match the color if needed
        }}
      >
        Select Data Source
      </Typography>
      <Button
        variant="contained"
        onClick={loadRodent379}
        sx={{
          m: 1,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 'bold'
        }}
      >
        Load Rodent 379 Data
      </Button>
      <Button
        variant="contained"
        onClick={loadRodent665}
        sx={{
          m: 1,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 'bold'
        }}
      >
        Load Rodent 665 Data
      </Button>
      <Button
        variant="contained"
        onClick={fetchMetadataFromAPI}
        sx={{
          m: 1,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 'bold'
        }}
      >
        Fetch New Data from API
      </Button>
      {loading && (
        <Typography
          sx={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#ffffff'
          }}
        >
          Loading...
        </Typography>
      )}
      {error && (
        <Typography
          color="error"
          sx={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default MetadataRetriever;












