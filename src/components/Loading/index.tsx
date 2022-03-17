import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <CircularProgress />
    </Grid>
  );
}

export default Loading;
