import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHeading = ({ userName = "Shivkumar" }) => {
  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="body" component="p" color="text.secondary">
        {getGreeting()}, {userName} 👋
      </Typography>
      <Typography variant="h5" component="h1" fontWeight={500}>
        Dashboard Overview
      </Typography>
    </Box>
  );
};

export default DashboardHeading;
