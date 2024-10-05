// TimelineVisualization.js
import React from 'react';
import { Chart } from 'react-google-charts';
import { Box, Typography } from '@mui/material';

const TimelineVisualization2 = ({ taskData }) => {
  const chartData = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...taskData.map((task) => [
      task.id,
      task.name,
      '',
      new Date(task.start),
      new Date(task.end),
      null,
      task.progress,
      task.dependencies.join(','),
    ]),
  ];

  return (
    <Box mb={4} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        color="#ffffff"
        gutterBottom
        sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 'bold' }}
      >
        Gantt Chart for Experiment Phases
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Chart
          chartType="Gantt"
          width="100%"
          height="300px"
          data={chartData}
          options={{
            backgroundColor: {
              fill: '#1a1a2e',
            },
            hAxis: {
              textStyle: {
                color: '#66b3ff', // Set x-axis label color to blue
                fontSize: 12, // Set x-axis label font size
                bold: true,
              },
              gridlines: {
                color: '#444444', // Set grid line color
              },
            },
            vAxis: {
              textStyle: {
                color: '#ffffff', // Set y-axis label color to white
                fontSize: 14, // Set y-axis label font size
                bold: true,
              },
            },
            gantt: {
              trackHeight: 50,
              barCornerRadius: 10,
              barHeight: 40,
              arrow: {
                angle: 45,
                width: 2,
                color: '#ffcc00',
                radius: 0,
              },
              labelStyle: {
                fontName: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontSize: 16,
                color: '#ffffff',
              },
              criticalPathEnabled: true,
              criticalPathStyle: {
                stroke: '#ff6666',
                strokeWidth: 3,
              },
              shadowEnabled: true,
              innerGridLine: {
                stroke: '#444444',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

const taskDataArray = [
  {
    id: "1",
    start: "2020-11-01",
    end: "2020-11-05",
    name: "Preparation Phase",
    progress: 100,
    dependencies: [],
  },
  {
    id: "2",
    start: "2020-12-05",
    end: "2020-12-06",
    name: "Launch",
    progress: 100,
    dependencies: ["1"],
  },
  {
    id: "3",
    start: "2020-12-06",
    end: "2021-01-13",
    name: "Spaceflight",
    progress: 100,
    dependencies: ["2"],
  },
  {
    id: "4",
    start: "2021-01-13",
    end: "2021-01-14",
    name: "Splashdown",
    progress: 100,
    dependencies: ["3"],
  },
  {
    id: "5",
    start: "2021-01-14",
    end: "2021-01-17",
    name: "Recovery & Dissection",
    progress: 100,
    dependencies: ["4"],
  },
];

const GanttChartWithData = () => <TimelineVisualization2 taskData={taskDataArray} />;

export default GanttChartWithData;
