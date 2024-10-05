// MetadataRetriever.js
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

const MetadataRetriever = () => {
  const [metadata, setMetadata] = useState('');

  const fetchMetadata = async () => {
    try {
      // Replace with the local address of your Flask API
      const response = await axios.get('http://127.0.0.1:5000/api/metadata');
      setMetadata(JSON.stringify(response.data, null, 4));
    } catch (error) {
      setMetadata(`Error: ${error.message}`);
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={fetchMetadata}>
        Fetch Metadata
      </Button>
      <Box mt={2} p={2} sx={{ backgroundColor: '#f8f9fa', whiteSpace: 'pre-wrap' }}>
        <Typography component="pre">{metadata || 'Click the button to fetch metadata.'}</Typography>
      </Box>
    </Box>
  );
};

export default MetadataRetriever;
