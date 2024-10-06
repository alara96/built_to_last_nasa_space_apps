import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; // Importing spaceship icon

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a2e', mb: 2 }}>
      <Toolbar sx={{ justifyContent: 'center' }}> {/* Center Toolbar content */}
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            color: '#ffffff', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'  // Apple and cross-platform font family
          }}
        >
          Space Experiment Explorer (SEE)
        </Typography>
        {/* Adding the spaceship icon after the title */}
        <RocketLaunchIcon 
          sx={{ 
            color: '#ffffff', 
            fontSize: 40, 
            ml: 2 // Margin left to space it from the title
          }} 
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
