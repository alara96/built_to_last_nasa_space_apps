// TimelineVisualization.js
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
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

    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.event))
      .range([0, height])
      .padding(0.1);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.start))
      .attr('y', d => y(d.event))
      .attr('width', d => x(d.end) - x(d.start))
      .attr('height', y.bandwidth())
      .attr('fill', '#69b3a2');
  }, []);

  return <Box mb={4} ref={chartRef} />;
};

export default TimelineVisualization;