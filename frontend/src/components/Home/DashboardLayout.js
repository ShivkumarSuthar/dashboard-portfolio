import React from 'react'
import Home from './Home'
import SummaryLayout from './SumaryLayout'
import { Box, Stack } from '@mui/material'

function DashboardLayout() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      sx={{ width: '100%', px: 0 }}
    >
      <Box sx={{ flex: 1 }}>
        <Home />
      </Box>

      <Box sx={{ width: '320px', flexShrink: 0 }}>
        <SummaryLayout />
      </Box>
    </Stack>

  )
}
export default DashboardLayout
