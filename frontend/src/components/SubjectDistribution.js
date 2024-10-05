// SubjectDistribution.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Chart } from 'react-google-charts';

const SubjectDistribution = () => {
  const data = [
    ['Group', 'Number of Subjects'],
    ['Flight', 9],
    ['Habitat Ground Control', 9],
    ['Vivarium Ground Control', 9],
  ];

  const options = {
    title: 'Distribution of Subjects per Group',
    is3D: true,
    backgroundColor: '#1a1a2e', // Dark background to match your theme
    pieSliceTextStyle: {
      color: '#ffffff', // White text for better visibility
    },
    legend: {
      textStyle: {
        color: '#ffffff', // White text for the legend
      },
    },
    colors: ['#69b3a2', '#ffcc00', '#ff6666'], // Custom colors for segments
    tooltip: {
      textStyle: {
        color: '#000000', // Tooltip text color
      },
    },
  };

  return (
    <Box mb={4} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" color="#ffffff" gutterBottom>
        Subject Distribution
      </Typography>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
      />
    </Box>
  );
};

export default SubjectDistribution;
