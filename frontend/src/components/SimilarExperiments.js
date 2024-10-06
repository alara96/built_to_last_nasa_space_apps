import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
const SimilarExperiments = ({ experiments }) => {
  if (!experiments || experiments.length === 0) return null;
  return (
    <Box sx={{ mt: 4 }}>
      {experiments.map((experiment, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #FF7E5F, #FEB47B)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          <CardContent>
          <Typography
        variant="h5"
        color="fffff"
        sx={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Similar Experiments
      </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {experiment.experiment_id}
            </Typography>
            <Typography>{experiment.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
export default SimilarExperiments;