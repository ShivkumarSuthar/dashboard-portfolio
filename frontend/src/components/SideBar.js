import React, { useState } from "react";
import { 
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  Tooltip,
  Collapse,
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { NAV_OPTIONS } from "./common/data";
import { LOGO } from "./common/constant";

const drawerWidth = 80;
const expandedDrawerWidth = 240;

function SideBar() {
  const location = useLocation();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: 'background.paper',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          px: 1,
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
        }}
      >
        <Box
          component="img"
          src={LOGO}
          alt="Foliary Logo"
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      </Box>

      <Divider sx={{ width: '80%', mb: 2 }} />

      {/* Navigation List */}
      <List 
        disablePadding 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        {NAV_OPTIONS.map((item, index) => {
          const isActive = item?.url === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(item.url);
          const Icon = item.icon;

          return (
            <ListItem key={index} disablePadding sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Tooltip 
                title={item.label} 
                placement="right" 
                arrow
              >
                <IconButton
                  component={Link}
                  to={item.url}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    backgroundColor: isActive 
                      ? alpha(theme.palette.primary.main, 0.15)
                      : 'transparent',
                    color: isActive 
                      ? theme.palette.primary.main 
                      : theme.palette.text.secondary,
                    border: isActive 
                      ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
                      : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isActive 
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)',
                      color: theme.palette.primary.main,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    '&:active': {
                      transform: 'translateY(0px) scale(0.95)',
                    },
                  }}
                >
                  <Icon fontSize="medium" />
                </IconButton>
              </Tooltip>
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
          pt: 2,
        }}
      >
        <Box
          sx={{
            fontSize: '0.7rem',
            color: theme.palette.text.disabled,
            fontWeight: 500,
          }}
        >
          v1.0.0
        </Box>
      </Box>
    </Drawer>
  );
}

export default SideBar;