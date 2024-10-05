import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

const MetadataRetriever = () => {
  const [metadata, setMetadata] = useState('');

  const fetchMetadata = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/metadata');
      setMetadata(JSON.stringify(response.data, null, 4));
    } catch (error) {
      setMetadata(`Error: ${error.message}`);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '10px', color: 'white' }}>
      <Button variant="contained" onClick={fetchMetadata} sx={{ backgroundColor: '#e94560' }}>
        Fetch Metadata
      </Button>
      <Box mt={2} p={2} sx={{ backgroundColor: '#162447', whiteSpace: 'pre-wrap', borderRadius: '10px' }}>
        <Typography component="pre" sx={{ color: '#ffffff' }}>
          {metadata || 'Click the button to fetch metadata.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default MetadataRetriever;

