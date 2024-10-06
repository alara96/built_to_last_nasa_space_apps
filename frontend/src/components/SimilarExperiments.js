import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const SimilarExperiments = ({ experiments }) => {
  if (!experiments || experiments.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Similar Experiments</Typography>
      {experiments.map((experiment, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{experiment.experiment_id}</Typography>
            <Typography>{experiment.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SimilarExperiments;
