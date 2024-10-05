import React from 'react';
import { Box, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SubjectDistribution = () => {
  // Chart.js data format
  const data = {
    labels: ['Flight', 'Habitat Ground Control', 'Vivarium Ground Control'],
    datasets: [
      {
        label: 'Number of Subjects',
        data: [9, 9, 9],
        backgroundColor: ['#69b3a2', '#ffcc00', '#ff6666'], // Custom colors for segments
        borderColor: '#1a1a2e', // Dark border color to match background
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff', // White legend text
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Updated font
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff', // White background for tooltip
        titleColor: '#000000', // Black text for better readability
        bodyColor: '#000000', // Black text for body
      },
    },
    maintainAspectRatio: false, // Disable the default aspect ratio
  };

  return (
    <Box mb={4} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: 2 }}>
      <Typography 
        variant="h5" 
        color="#ffffff" 
        gutterBottom 
        sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',fontWeight: 'bold', 
        }}
      >
        Subject Distribution
      </Typography>
      <Box sx={{ height: '400px' }}>
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

export default SubjectDistribution;
