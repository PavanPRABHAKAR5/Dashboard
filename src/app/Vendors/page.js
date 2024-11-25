import React from 'react';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Vendors(under construction)
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Welcome to the Vendors List
      </Typography>
      <Typography variant="body1">
        Here you can view and manage all the Vendors.
      </Typography>
    </Box>
  );
};

export default Page;
