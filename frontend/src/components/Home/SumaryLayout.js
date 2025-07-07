import React from 'react';
import { Box, Typography, Card, Stack, Divider, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SummaryLayout = () => {
  return (
    <Box sx={{ padding:'40px 15px', borderRadius: 0, bgcolor: '#fff', height:'100vh' }}>
      {/* Section Heading */}
      <Typography variant="h5" fontWeight={500} mb={3}>
        Summary Panel
      </Typography>

      {/* Top Summary Box */}
      <Card sx={{ p: 2, borderRadius: 1, mb: 3, position: 'relative', bgcolor:`background.default` }}>
        <Typography variant="body2" color="text.secondary">Portfolio Overview</Typography>
        <Typography variant="h5" fontWeight={700}>45 Total Items</Typography>
        <Stack direction="row" spacing={2} mt={1}>
          <Typography color="green">+4 added this month</Typography>
          <Typography color="error">-1 removed</Typography>
        </Stack>
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: '#eee',
            '&:hover': { bgcolor: '#ddd' },
          }}
        >
          <AddCircleIcon color="primary" />
        </IconButton>
      </Card>

      {/* Recent Activity Section */}
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Recent Activity
      </Typography>
      <Stack spacing={2} mb={3}>
        <Box>
          <Typography fontWeight={600}>🆕 Added new project</Typography>
          <Typography variant="body2" color="text.secondary">
            "Portfolio Dashboard" with MUI and custom layout
          </Typography>
          <Typography variant="caption" color="text.disabled">2 hours ago</Typography>
        </Box>
        <Box>
          <Typography fontWeight={600}>✏️ Updated skill</Typography>
          <Typography variant="body2" color="text.secondary">
            React.js proficiency level changed to "Advanced"
          </Typography>
          <Typography variant="caption" color="text.disabled">1 day ago</Typography>
        </Box>
        <Box>
          <Typography fontWeight={600}>🏢 Added work experience</Typography>
          <Typography variant="body2" color="text.secondary">
            MERN Developer at Dev Technosys
          </Typography>
          <Typography variant="caption" color="text.disabled">3 days ago</Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Categories Section */}
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Top Tech Categories</Typography>
      <Stack direction="row" spacing={2}>
        <Box sx={{ p: 2, bgcolor: '#fff4db', borderRadius: 1, flex: 1, textAlign: 'center' }}>
          <Typography fontWeight={600}>Frontend</Typography>
          <Typography fontSize={12} color="text.secondary">14 items</Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#d6f4e6', borderRadius: 1, flex: 1, textAlign: 'center' }}>
          <Typography fontWeight={600}>Backend</Typography>
          <Typography fontSize={12} color="text.secondary">10 items</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SummaryLayout;
