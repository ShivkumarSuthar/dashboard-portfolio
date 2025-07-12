import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Skeleton,
  Typography,
  Paper,
  Chip,
  IconButton,
  Button,
} from "@mui/material";

import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  FolderOpen as FolderOpenIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  SearchOff as SearchOffIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { getDashboardData } from "../common/services";
import DashboardHeading from "./DashboardHeading";
import GroupIcon from "@mui/icons-material/Group";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';


function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getDashboardData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, icon, bgColor = "#72b8d2" }) => (
    <Box
      sx={{
        width: {
          xs: "100%",             // full width on mobile
          sm: "calc(50% - 8px)",  // two in a row on small screens
          md: "calc(25% - 12px)", // four in a row on md+ screens
        },
        minHeight: 'auto',
        borderRadius: 1,
        p: 2,
        color: "#fff",
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: 2,
      }}
    >

      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h6">
        {loading ? <Skeleton width={40} /> : value}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: -5,
          right: -5,
          fontSize: 80,
          color: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {icon}
      </Box>
    </Box>
  );


  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "0" }}>
      <DashboardHeading />

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
        sx={{
          mt: 3,
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <StatCard
          title="Total Projects"
          value={data?.totalProjects}
          icon={<GroupIcon fontSize="inherit" />}
        />
        <StatCard
          title="Work Experience"
          value={data?.workExperienceCount}
          icon={<GroupIcon fontSize="inherit" />}
        />
        <StatCard
          title="Total Skills"
          value={data?.totalSkills}
          icon={<GroupIcon fontSize="inherit" />}
        />
        <StatCard
          title="Testimonials"
          value="Coming Soon..."
          icon={<GroupIcon fontSize="inherit" />}
        />
      </Stack>


      <Box sx={{ height: 400, width: "100%" }}>
        {data?.recentProjects?.length > 0 && (
          <>
            <Box
              sx={{
                mt: 4,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Recent Projects</Typography>

              <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none" }}
                to="/projects/list"
                component={Link}
              >
                See All
              </Button>
            </Box>

            <DataGrid
              autoHeight
              sx={{
                mt: 2,
                "& .MuiDataGrid-cell": {
                  alignItems: "center !important",
                  display: "flex",
                },
                "& .MuiDataGrid-row": {
                  alignItems: "center",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fafafa",
                },
              }}

              hideFooter
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              disableRowSelectionOnClick
              rows={data.recentProjects.map((item, index) => ({
                ...item,
                index: index + 1,
              }))}
              columns={[
                {
                  field: "index",
                  headerName: "#",
                  width: 60,
                },
                {
                  field: "title",
                  headerName: "Title",
                  flex: 1,
                },
                {
                  field: "links",
                  headerName: "Links",
                  sortable: false,
                  flex: 0.8,
                  renderCell: (params) => (
                    <Stack direction="row" spacing={1}>
                      {params.row.githubUrl && (
                        <Button
                          size="small"
                          startIcon={<GitHubIcon />}
                          href={params.row.githubUrl}
                          target="_blank"
                        >
                          GitHub
                        </Button>
                      )}
                      {params.row.liveUrl && (
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          href={params.row.liveUrl}
                          target="_blank"
                        >
                          Live
                        </Button>
                      )}
                    </Stack>
                  ),
                },
                {
                  field: "techStack",
                  headerName: "Tech Stack",
                  sortable: false,
                  flex: 2,
                  renderCell: (params) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {params.value.map((tech) => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>
                  ),
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 120,
                  renderCell: (params) => { 
                    return (
                    <Button
                      variant="outlined"
                      size="small"
                      to={`projects/details/${params.row.id}`}
                      component={Link}
                    >
                      Open
                    </Button>
                  )},
                },
              ]}
            />
          </>
        )}

        {data?.recentWorkHistory?.length > 0 && (
          <>
            <Box
              sx={{
                mt: 4,
                mb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Recent Work History</Typography>

              <Button
                variant="text"
                size="small"
                component={Link}
                sx={{ textTransform: "none" }}
                to="/work-experience/list"
              >
                See All
              </Button>
            </Box>

            <DataGrid
              autoHeight
              hideFooter
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              disableRowSelectionOnClick
              rows={data.recentWorkHistory.map((item, index) => ({
                ...item,
                index: index + 1,
                duration: `${new Date(item.startDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })} - ${item.isCurrent ? "Present" : new Date(item.endDate).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}`,
              }))}
              columns={[
                {
                  field: "index",
                  headerName: "#",
                  width: 60,
                },
                {
                  field: "company",
                  headerName: "Company",
                  flex: 1,
                },
                {
                  field: "position",
                  headerName: "Position",
                  flex: 1,
                },
                {
                  field: "location",
                  headerName: "Location",
                  flex: 1,
                },
                {
                  field: "duration",
                  headerName: "Duration",
                  flex: 1.2,
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 120,
                  renderCell: (params) => (
                    <Button
                      variant="outlined"
                      size="small"
                      to={`projects/details/${params.row.id}`}
                      component={Link}
                    >
                      Open
                    </Button>
                  ),
                },
                // {
                //   field: "techStack",
                //   headerName: "Tech Stack",
                //   flex: 1.5,
                //   renderCell: (params) => (
                //     <Stack direction="row" spacing={1} flexWrap="wrap">
                //       {params.value.map((tech) => (
                //         <Chip key={tech} label={tech} size="small" />
                //       ))}
                //     </Stack>
                //   ),
                // },
              ]}
            />
          </>
        )}

      </Box>
    </Box>
  );
}

export default Home;
