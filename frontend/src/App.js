import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import SummaryCards from './components/SummaryCards';
import TimelineVisualization from './components/TimelineVisualization';
import MetadataRetriever from './components/MetadataRetriever';
import SimilarExperiments from './components/SimilarExperiments';
import SameSubjectExperiments from './components/SameSubjectExperiments';
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

        {/* Metadata Retriever centered below the header */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <MetadataRetriever onMetadataFetched={handleMetadataFetched} />
        </Box>

        {/* Summary Cards Component */}
        {filteredData && <SummaryCards metadata={filteredData} />}

        {/* Timeline Visualization */}
        {filteredData && <TimelineVisualization metadata={filteredData} />}

        {/* Similar and Same Subject Experiments */}
        {filteredData && (
          <>
            <SimilarExperiments experiments={filteredData.similar_experiments.osdr_experiments} />
            <SameSubjectExperiments experiments={filteredData.similar_experiments.same_subject_experiments} />
          </>
        )}
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
          opacity: 0.8; /* Increased opacity for glowing effect */
          box-shadow: 0 0 10px white; /* Glowing effect */
          animation: twinkling 1.5s infinite alternate, moveStar 20s linear infinite; /* Make stars twinkle and move */
          z-index: 2; /* Ensures stars appear in front of content */
        }

        @keyframes twinkling {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @keyframes moveStar {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(calc(100vw - 50px), calc(100vh - 50px)); /* Adjust the movement path */
          }
        }

        /* Shooting star style */
        .shooting-star {
          position: absolute;
          background-color: white;
          height: 2px;
          z-index: 3;
          animation: shoot 1.5s linear infinite;
        }

        @keyframes shoot {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(200px, -200px); opacity: 0; }
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

        .galaxy-background {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url('/path/to/your/galaxy-image.jpg') no-repeat center center fixed;
          background-size: cover;
          z-index: 0; /* Galaxy background behind everything else */
          opacity: 0.3; /* Adjust for visibility */
        }
      `}</style>

      {/* Add stars and shooting stars to the foreground while allowing scrolling */}
      <div className="stars-wrapper">
        {/* Galaxy Background */}
        <div className="galaxy-background" />

        {/* Stars */}
        {[...Array(200)].map((_, i) => (  // Increased star count to 200
          <div
            key={i}
            className="star"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 5}s`, // Random delay for twinkling effect
              animationDuration: `${Math.random() * 10 + 15}s`, // Random duration for movement
            }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (  // Increased shooting stars to 5
          <div
            key={i}
            className="shooting-star"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 50}vh`, // Random starting position for shooting stars
              animationDelay: `${Math.random() * 2}s`, // Random delay for shooting stars
            }}
          />
        ))}
      </div>
    </>
  );
};

export default App;

