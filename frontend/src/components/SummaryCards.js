// SummaryCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SummaryCards = () => {
  return (
    <Grid container spacing={4} className="mb-4">
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Number of Subjects per Group</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> 9<br />
              <strong>HGC:</strong> 9<br />
              <strong>VGC:</strong> 9
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Treatments</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              <strong>Flight:</strong> Spaceflight Exposure<br />
              <strong>HGC:</strong> Habitat Ground Control<br />
              <strong>VGC:</strong> Vivarium Ground Control
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#1a1a2e', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Mouse Weight Overview</Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              Weight range: <strong>27.3g - 35.9g</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;

