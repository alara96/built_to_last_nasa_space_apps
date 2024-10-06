import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as d3 from 'd3';

const TimelineVisualization = ({ metadata }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!metadata || !metadata.pre_launch_events || !metadata.post_return_events) return;

    const events = [
      ...metadata.pre_launch_events.map(event => ({
        event: event.event,
        date: new Date(event.date),
      })),
      ...metadata.post_return_events.map(event => ({
        event: event.event,
        date: new Date(event.date),
      })),
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
      .domain(d3.extent(events, d => d.date))
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(events.map(d => d.event))
      .range([0, height])
      .padding(0.1);

    svg.append('g').call(d3.axisLeft(y));
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

    svg.selectAll('.bar')
      .data(events)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.event))
      .attr('width', 10)
      .attr('height', y.bandwidth())
      .attr('fill', '#69b3a2');
  }, [metadata]);

  return <Box ref={chartRef} />;
};

export default TimelineVisualization;
