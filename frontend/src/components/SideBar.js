import React, { useState } from "react";
import { 
  Box, 
  Drawer, 
  Button, 
  List, 
  ListItem, 
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { NAV_OPTIONS } from "./common/data";
import { LOGO } from "./common/constant";

const drawerWidth = 80;

function SideBar() {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1,
          px: 0,
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}
      >
        <Box
          component="img"
          src={LOGO}
          alt="Logo"
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Navigation List */}
      <List 
        disablePadding 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 0,
          width: '100%',
          flex: 1,
        }}
      >
        {NAV_OPTIONS.map((item, index) => {
          const isActive = item?.url === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.url);
          const Icon = item.icon;

          return (
            <ListItem key={index} disablePadding sx={{ width: '100%' }}>
              <Button
                component={Link}
                to={item.url}
                sx={{
                  width: '100%',
                  height: 64,
                  borderRadius: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  backgroundColor: isActive 
                    ? 'rgba(255, 87, 34, 0.08)'
                    : 'transparent',
                  color: isActive 
                    ? '#ff5722' 
                    : '#757575',
                  borderLeft: isActive 
                    ? '3px solid #ff5722'
                    : '3px solid transparent',
                  textTransform: 'none',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  minHeight: 64,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? 'rgba(255, 87, 34, 0.12)'
                      : 'rgba(0, 0, 0, 0.04)',
                    color: isActive ? '#ff5722' : '#424242',
                  },
                }}
              >
                <Icon fontSize="small" />
                <Box
                  sx={{
                    fontSize: '0.6rem',
                    lineHeight: 1,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {item.label}
                </Box>
              </Button>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Section */}
      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}
      >
        <Box
          sx={{
            fontSize: '0.6rem',
            color: '#bdbdbd',
            fontWeight: 400,
          }}
        >
          v1.0.0
        </Box>
      </Box>
    </Drawer>
  );
}

export default SideBar;