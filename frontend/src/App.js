// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import SummaryCards from './components/SummaryCards';
import SubjectDistribution from './components/SubjectDistribution';
import TimelineVisualization from './components/TimelineVisualization';
import Flowchart from './components/Flowchart';
import MetadataRetriever from './components/MetadataRetriever';


const App = () => {
  return (
    <Container>
      <SummaryCards />
      <SubjectDistribution />
      <TimelineVisualization />
      <Flowchart />
      <MetadataRetriever />
    </Container>
  );
};

export default App;
