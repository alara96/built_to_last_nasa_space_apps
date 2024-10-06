import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HealingIcon from '@mui/icons-material/Healing';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryCards = ({ metadata }) => {
  const [chartData, setChartData] = useState(null); // Corrected destructuring

  useEffect(() => {
    // Simulate fetching data from an array in file
    const dataArray = {
      flight: { subjects: 9, treatment: 'Spaceflight Exposure' },
      hgc: { subjects: 9, treatment: 'Habitat Ground Control' },
      vgc: { subjects: 9, treatment: 'Vivarium Ground Control' },
      weightRange: '27.3g - 35.9g',
    };
    setChartData(dataArray);
  }, []);

  if (!metadata || metadata.error) {
    return <Typography>Error fetching data</Typography>;
  }

  if (!chartData) {
    return <Typography>Loading...</Typography>;
  }

  const chartDataForPie = {
    labels: ['Flight', 'Habitat Ground Control', 'Vivarium Ground Control'],
    datasets: [
      {
        label: 'Number of Subjects',
        data: [chartData.flight.subjects, chartData.hgc.subjects, chartData.vgc.subjects],
        backgroundColor: ['#69b3a2', '#ffcc00', '#ff6666'], // Custom colors for segments
        borderColor: '#1a1a2e', // Dark border color to match background
        borderWidth: 1,
      },
    ],
  };

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
      <Box flex={{ md: 1 }} display="flex" flexDirection="column" gap={4} alignItems="center" justifyContent="center">
        <Card sx={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white', borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardContent>
            <VaccinesIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Number of Subjects per Group</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> {chartData.flight.subjects}<br />
              <strong>HGC:</strong> {chartData.hgc.subjects}<br />
              <strong>VGC:</strong> {chartData.vgc.subjects}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', color: 'white', borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardContent>
            <HealingIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Treatments</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> {chartData.flight.treatment}<br />
              <strong>HGC:</strong> {chartData.hgc.treatment}<br />
              <strong>VGC:</strong> {chartData.vgc.treatment}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'linear-gradient(135deg, #43cea2, #185a9d)', color: 'white', borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)', height: '100%', width: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <CardContent>
            <MonitorWeightIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Mouse Weight Overview</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5, fontWeight: 'bold' }}>
              <strong>Weight range:</strong> {chartData.weightRange}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Subject Distribution Chart */}
      <Box flex={{ md: 1 }} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
        <Typography
          variant="h5"
          color="#ffffff"
          gutterBottom
          sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 'bold' }}
        >
          Subject Distribution
        </Typography>
        <Box sx={{ height: '400px' }}>
          <Pie data={chartDataForPie} options={chartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryCards;
