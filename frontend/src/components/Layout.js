import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function Layout() {
  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          padding: '16px 24px',
          backgroundColor: 'background.default',
          marginLeft: 0, // Remove any margin as sidebar is now properly positioned
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}