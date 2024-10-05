// Flowchart.js
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as d3 from 'd3';

const Flowchart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [
      { group: 'Flight', subjects: 9 },
      { group: 'Habitat Ground Control', subjects: 9 },
      { group: 'Vivarium Ground Control', subjects: 9 },
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

    const root = d3.hierarchy({
      name: 'Experiment',
      children: data.map(d => ({ name: d.group, size: d.subjects })),
    });

    const treeLayout = d3.tree().size([width, height]);
    const treeData = treeLayout(root);

    const links = svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#ccc');

    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
      .attr('r', 5)
      .attr('fill', '#69b3a2');

    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => (d.children ? -10 : 10))
      .style('text-anchor', d => (d.children ? 'end' : 'start'))
      .text(d => d.data.name);
  }, []);

  return <Box mb={4} ref={chartRef} />;
};

export default Flowchart;