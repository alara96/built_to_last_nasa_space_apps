// SummaryCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const SummaryCards = () => {
  return (
    <Grid container spacing={4} className="mb-4">
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4">Number of Subjects per Group</Typography>
            <Typography>Flight: 9, HGC: 9, VGC: 9</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4">Treatments</Typography>
            <Typography>Flight: Spaceflight Exposure, HGC: Habitat Ground Control, VGC: Vivarium Ground Control</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h4">Mouse Weight Overview</Typography>
            <Typography>Weight range: 27.3g - 35.9g</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;