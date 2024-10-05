// TimelineVisualization.js --> this is the one being used in the TV2

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import * as d3 from 'd3';

const TimelineVisualization = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { event: 'Launch', start: new Date(2020, 11, 5), end: new Date(2020, 11, 5) },
      { event: 'Spaceflight', start: new Date(2020, 11, 6), end: new Date(2021, 0, 13) },
      { event: 'Splashdown', start: new Date(2021, 0, 13), end: new Date(2021, 0, 13) },
      { event: 'Recovery', start: new Date(2021, 0, 13), end: new Date(2021, 0, 14) },
      { event: 'Dissection', start: new Date(2021, 0, 14), end: new Date(2021, 0, 17) },
    ];

    const margin = { top: 40, right: 30, bottom: 50, left: 100 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Clear any previous SVG
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
      .range([0, width]);

    const y = d3.scalePoint()
      .domain(data.map(d => d.event))
      .range([0, height])
      .padding(1);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d, %Y")))
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '12px')
      .style('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')
      .style('text-anchor', 'middle');

    svg.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#ffffff')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif');

    // Draw links between events
    svg.selectAll('.link')
      .data(data.slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d, i) => {
        const prev = data[i];
        return `M${x(prev.end)},${y(prev.event)} C${(x(prev.end) + x(d.start)) / 2},${y(prev.event)} ${(x(prev.end) + x(d.start)) / 2},${y(d.event)} ${x(d.start)},${y(d.event)}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#ffcc00')
      .attr('stroke-width', 2);

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.start))
      .attr('y', d => y(d.event) - 10)
      .attr('width', d => x(d.end) - x(d.start))
      .attr('height', 50)
      .attr('fill', '#69b3a2')
      .attr('rx', 10);

    // Adding event labels to the bars
    svg.selectAll('.event-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'event-label')
      .attr('x', d => x(d.start) + 5)
      .attr('y', d => y(d.event))
      .attr('dy', '.35em')
      .attr('fill', '#ffffff')
      .style('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')
      .style('font-size', '12px')
      .text(d => d.event);
  }, []);

  return (
    <Box mb={4} sx={{ bgcolor: '#1a1a2e', p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
      <Typography
        variant="h5"
        color="#ffffff"
        gutterBottom
        sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 'bold' }}
      >
        Timeline of Events
      </Typography>
      <Box ref={chartRef} sx={{ width: '100%' }} />
    </Box>
  );
};

export default TimelineVisualization;