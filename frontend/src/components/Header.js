// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a2e', mb: 2 }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
          Space Experiment Explorer (SEE)
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
