// SummaryCards.js
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryCards = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an array in file
    const dataArray = {
      flight: { subjects: 9, treatment: 'Spaceflight Exposure' },
      hgc: { subjects: 9, treatment: 'Habitat Ground Control' },
      vgc: { subjects: 9, treatment: 'Vivarium Ground Control' },
      weightRange: '27.3g - 35.9g'
    };
    setData(dataArray);
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  // Chart.js data format
  const chartData = {
    labels: ['Flight', 'Habitat Ground Control', 'Vivarium Ground Control'],
    datasets: [
      {
        label: 'Number of Subjects',
        data: [data.flight.subjects, data.hgc.subjects, data.vgc.subjects],
        backgroundColor: ['#69b3a2', '#ffcc00', '#ff6666'], // Custom colors for segments
        borderColor: '#1a1a2e', // Dark border color to match background
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
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
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
      {/* Summary Cards */}
      <Box flex={{ md: 1 }}>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Number of Subjects per Group</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> {data.flight.subjects}<br />
              <strong>HGC:</strong> {data.hgc.subjects}<br />
              <strong>VGC:</strong> {data.vgc.subjects}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Treatments</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> {data.flight.treatment}<br />
              <strong>HGC:</strong> {data.hgc.treatment}<br />
              <strong>VGC:</strong> {data.vgc.treatment}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Mouse Weight Overview</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              Weight range: <strong>{data.weightRange}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Subject Distribution Chart */}
      <Box flex={{ md: 1 }} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: 2 }}>
        <Typography
          variant="h5"
          color="#ffffff"
          gutterBottom
          sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 'bold' }}
        >
          Subject Distribution
        </Typography>
        <Box sx={{ height: '400px' }}>
          <Pie data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryCards;