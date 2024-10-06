import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import SummaryCards from './components/SummaryCards';
import TimelineVisualization from './components/TimelineVisualization';
import MetadataRetriever from './components/MetadataRetriever';
import Header from './components/Header';
import axios from 'axios'; // For making API calls to Flask

const App = () => {
  const [metadata, setMetadata] = useState(null); // Holds the metadata
  const [filteredData, setFilteredData] = useState(null); // Holds the filtered metadata

  // Function to handle metadata once fetched (from either local or API)
  const handleMetadataFetched = (fetchedMetadata) => {
    setMetadata(fetchedMetadata);
    setFilteredData(fetchedMetadata); // Initialize filtered data
  };

  // Automatically load the default rodent 379 data when the component mounts
  useEffect(() => {
    const loadRodent379FromAPI = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/rodent/379'); // Fetch rodent_379.json from Flask
        setMetadata(response.data); // Set metadata from the API
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error loading rodent 379 data:', error);
      }
    };

    loadRodent379FromAPI(); // Automatically load rodent 379 data on component mount
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} sx={{ backgroundColor: 'black', minHeight: '100vh', py: 4, margin: 0, position: 'relative', overflowY: 'auto' }}>
        {/* Header Component */}
        <Header />
        
        {/* Summary Cards Component */}
        {filteredData && <SummaryCards metadata={filteredData} />}

        {/* Timeline Visualization */}
        {filteredData && <TimelineVisualization metadata={filteredData} />}

        {/* Metadata Retriever to allow loading rodent 665 data or fetching from Flask API */}
        <MetadataRetriever onMetadataFetched={handleMetadataFetched} />
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
