import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HealingIcon from '@mui/icons-material/Healing';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryCards = ({ metadata }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (metadata) {
      const groups = metadata.groups.map(group => ({
        name: group.group_name,
        subjects: group.subjects,
      }));
      setChartData(groups);
    }
  }, [metadata]);

  if (!metadata || metadata.error) {
    return <Typography>Error fetching data</Typography>;
  }

  if (!chartData) {
    return <Typography>Loading...</Typography>;
  }

  const chartDataForPie = {
    labels: chartData.map(group => group.name),
    datasets: [
      {
        label: 'Number of Subjects',
        data: chartData.map(group => group.subjects),
        backgroundColor: ['#69b3a2', '#ffcc00', '#ff6666', '#6a5acd'], // Custom colors for segments
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
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#000000',
        bodyColor: '#000000',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
      {/* Title, Purpose, Treatments, and Results Stack */}
      <Box flex={{ md: 1 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Stack direction="column" spacing={4} sx={{ width: '100%' }}>
          {/* Title and Purpose Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #7b2cbf, #9d4edd)', // Purpleish gradient for Title/Purpose card
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
              width: '100%',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {metadata.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 'normal',
                }}
              >
                <strong>Purpose: </strong>{metadata.purpose}
              </Typography>
            </CardContent>
          </Card>

          {/* Carousel for Group Cards */}
          <Carousel>
            {metadata.groups.map((group, index) => (
              <div key={index}>
                {/* Group: Treatments */}
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', // Color for Treatments card
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
                    width: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    mb: 4,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{group.group_name} - Treatments</Typography>
                    <VaccinesIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                      {group.treatment || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Group: Results */}
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #43cea2, #185a9d)', // Color for Results card
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
                    width: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{group.group_name} - Results</Typography>
                    <HealingIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                      {group.results || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Carousel>
        </Stack>
      </Box>

      {/* Subject Distribution Chart */}
{/* Subject Distribution Chart */}
<Box
  flex={{ md: 1 }}
  sx={{
    bgcolor: '#1a1a2e',
    p: 3,
    borderRadius: '12px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s',
    '&:hover': { transform: 'scale(1.03)' },
    display: 'flex',            // Flexbox layout
    flexDirection: 'column',     // Ensure vertical stacking of title and chart
    alignItems: 'center',        // Center horizontally
  }}
>
  <Typography
    variant="h5"
    color="#ffffff"
    gutterBottom
    sx={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',        // Ensure title is centered horizontally
    }}
  >
    Subject Distribution
  </Typography>

  {/* Box for centering the chart */}
  <Box 
    sx={{ 
      height: '400px', 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center',   // Center chart horizontally
      alignItems: 'center',       // Center chart vertically
      flexGrow: 1                 // Allow chart to take up remaining space
    }}
  >
    <Pie data={chartDataForPie} options={chartOptions} />
  </Box>
</Box>

    </Box>
  );
};

export default SummaryCards;