import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
