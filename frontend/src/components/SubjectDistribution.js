// SubjectDistribution.js
import React from 'react';
import { Box } from '@mui/material';
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
  };

  return (
    <Box mb={4}>
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