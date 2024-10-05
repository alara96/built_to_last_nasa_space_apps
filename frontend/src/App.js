// App.js
import React from 'react';
import { Container, CssBaseline, Grid } from '@mui/material';
import SummaryCards from './components/SummaryCards';
import SubjectDistribution from './components/SubjectDistribution';
import TimelineVisualization from './components/TimelineVisualization';
import Flowchart from './components/Flowchart';
import MetadataRetriever from './components/MetadataRetriever';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} sx={{ backgroundColor: 'black', minHeight: '100vh', py: 4, margin: 0, position: 'relative', overflowY: 'auto' }}>
        <Header />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SummaryCards />
          </Grid>
          <Grid item xs={12} md={6}>
            <SubjectDistribution />
          </Grid>
          <Grid item xs={12}>
            <TimelineVisualization />
          </Grid>
          <Grid item xs={12}>
            <Flowchart />
          </Grid>
          <Grid item xs={12}>
            <MetadataRetriever />
          </Grid>
        </Grid>
      </Container>
      <style jsx global>{`
        body {
          margin: 0;
          background-color: black;
          color: white; /* Ensure text is visible against the black background */
        }

        /* Create a starry background */
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0.5;
          animation: twinkling 1.5s infinite alternate;
          z-index: 2; /* Ensures stars appear in front of content */
        }

        @keyframes twinkling {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .stars-wrapper {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          pointer-events: none; /* Ensure stars do not block interaction with page */
        }
      `}</style>
      {/* Add stars to the foreground while allowing scrolling */}
      <div className="stars-wrapper">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default App;
