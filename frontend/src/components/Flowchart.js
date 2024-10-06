import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import * as d3 from 'd3';

const Flowchart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createFlowchart = (container, data, title, width, height, startX, startY) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };

      const svg = d3.select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Title for each section
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('fill', '#ffffff')
        .style('font-size', '20px')
        .text(title);

      // Create nodes (rectangles for steps in the flowchart)
      const nodes = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${startX + i * 150}, ${startY + i * 100})`);

      nodes.append('rect')
        .attr('width', 140)
        .attr('height', 50)
        .attr('fill', '#69b3a2')
        .attr('stroke', '#ffffff')
        .attr('rx', 10)
        .attr('ry', 10);

      nodes.append('text')
        .attr('x', 70)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .style('fill', '#ffffff')
        .style('font-size', '14px')
        .text(d => d.name);

      // Create arrows between nodes
      svg.selectAll('line')
        .data(data.slice(1))
        .enter()
        .append('line')
        .attr('x1', (d, i) => startX + i * 150 + 140)
        .attr('y1', (d, i) => startY + i * 100 + 25)
        .attr('x2', (d, i) => startX + (i + 1) * 150)
        .attr('y2', (d, i) => startY + (i + 1) * 100 + 25)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)');

      // Arrow definition
      svg.append('defs')
        .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', '10')
        .attr('refY', '5')
        .attr('markerWidth', '6')
        .attr('markerHeight', '6')
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,0 L10,5 L0,10 Z')
        .attr('fill', '#ffffff');
    };

    const preLaunchData = [
      { name: 'Proposal Submitted' },
      { name: 'Approval Obtained' },
      { name: 'Preparation Completed' },
      { name: 'Experiment Launched' }
    ];

    const postReturnData = [
      { name: 'Experiment Retrieved' },
      { name: 'Data Analyzed' },
      { name: 'Report Generated' }
    ];

    // Clear previous SVG
    d3.select(chartRef.current).selectAll('*').remove();

    // Create two flowcharts for pre-launch and post-return events
    const width = 600;
    const height = 400;

    createFlowchart(chartRef.current, preLaunchData, 'Pre-Launch Events', width, height, 0, 0);
    createFlowchart(chartRef.current, postReturnData, 'Post-Return Events', width, height, 0, 500); // Adjust starting position for second flowchart
  }, []);

  return (
    <Box mb={4} ref={chartRef}>
      <Typography variant="h4" align="center" color="#ffffff" mb={2}>
        Flowchart Overview
      </Typography>
    </Box>
  );
};

export default Flowchart;
