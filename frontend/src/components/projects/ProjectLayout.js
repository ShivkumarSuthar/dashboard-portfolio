import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    Chip,
    Tooltip,
    IconButton,
    Card,
    CardContent,
    Grid,
    Paper,
    CardMedia,
    ButtonGroup,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getProjectData } from '../common/services';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDataTable from '../common/CustomDataTable';

import GridViewIcon from '@mui/icons-material/GridView';
import AddIcon from '@mui/icons-material/Add';
import TableViewIcon from '@mui/icons-material/TableView';

function ProjectLayout() {
    const [projectData, setProjectData] = useState([]);
    const [viewMode, setViewMode] = useState('table');
    

    useEffect(() => {
        getProjectData()
            .then(res => {
                console.log("FULL API RESPONSE:", res);
                console.log("DATA:", res.data);
                setProjectData(res.data || []);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            });
    }, []);

    const handleDelete = (id) => {
        console.log(`Delete project with ID: ${id}`);
        // Implement delete functionality here
    };

    const handleAddProject = () => {
        console.log('Add new project');
        // Navigate to add project page or open modal
    };

    // Define columns for the table
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
        },
        {
            field: 'title',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => (
                <Link 
                    to={`/projects/${params.row.id}`}
                    style={{ 
                        color: '#1976d2', 
                        textDecoration: 'none',
                        fontWeight: 500
                    }}
                >
                    {params.value}
                </Link>
            )
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary">
                    {params.value}
                </Typography>
            )
        },
        {
            field: "techStack",
            headerName: "Tech Stack",
            sortable: false,
            width: 300,
            renderCell: (params) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {params.value?.map((tech) => (
                        <Chip 
                            key={tech} 
                            label={tech} 
                            size="small" 
                            variant="outlined"
                            sx={{ fontSize: '0.75rem', height: 24 }}
                        />
                    ))}
                </Box>
            ),
        },
        {
            field: "links",
            headerName: "Links",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {params.row.githubUrl && (
                        <Button
                            size="small"
                            startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
                            href={params.row.githubUrl}
                            target="_blank"
                            sx={{ 
                                minWidth: 'auto',
                                px: 1,
                                fontSize: '0.75rem',
                                textTransform: 'none'
                            }}
                        >
                            GitHub
                        </Button>
                    )}
                    {params.row.liveUrl && (
                        <Button
                            size="small"
                            startIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                            href={params.row.liveUrl}
                            target="_blank"
                            sx={{ 
                                minWidth: 'auto',
                                px: 1,
                                fontSize: '0.75rem',
                                textTransform: 'none'
                            }}
                        >
                            Live
                        </Button>
                    )}
                </Stack>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Open project details">  
                        <IconButton
                            size="small"
                            to={`/projects/details/${params.row.id}`}
                            component={Link}
                        >
                            <FolderOpenIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete project">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        }
    ];

    // Define filters
    const filters = [
        {
            key: 'name',
            label: 'Project Name',
            width: 140,
            options: projectData.map(project => ({
                value: project.title,
                label: project.title
            }))
        }
    ];
    

    const RenderAdditionButton = () => {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{
                    display: 'flex',
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    p: 0.5,
                    border: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Button
                        variant={viewMode === 'table' ? 'contained' : 'text'}
                        startIcon={<TableViewIcon />}
                        onClick={() => setViewMode('table')}
                        sx={{
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1.5,
                            bgcolor: viewMode === 'table' ? 'white' : 'transparent',
                            color: viewMode === 'table' ? 'primary.main' : 'text.secondary',
                            boxShadow: viewMode === 'table' ? 1 : 'none',
                            '&:hover': {
                                bgcolor: viewMode === 'table' ? 'white' : 'grey.200'
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        Table
                    </Button>
                    <Button
                        variant={viewMode === 'grid' ? 'contained' : 'text'}
                        startIcon={<GridViewIcon />}
                        onClick={() => setViewMode('grid')}
                        sx={{
                            textTransform: 'none',
                            minWidth: 'auto',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1.5,
                            bgcolor: viewMode === 'grid' ? 'white' : 'transparent',
                            color: viewMode === 'grid' ? 'primary.main' : 'text.secondary',
                            boxShadow: viewMode === 'grid' ? 1 : 'none',
                            '&:hover': {
                                bgcolor: viewMode === 'grid' ? 'white' : 'grey.200'
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        Grid
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/projects/add"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        bgcolor: '#8e6a8b',
                        '&:hover': { bgcolor: '#7a5a77' }
                    }}
                >
                    Create New
                </Button>
            </Stack>
        )
    }

    // Define searchable fields
    const searchFields = ['title', 'description'];

    // Define list view renderer
    // const renderListView = (filteredData) => (
    //     <Box sx={{ mt: 2 }}>
    //         {filteredData.map((project) => (
    //             <Card key={project.id} sx={{ mb: 2 }}>
    //                 <CardContent>
    //                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    //                         <Box sx={{ flex: 1 }}>
    //                             <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
    //                                 <Link 
    //                                     to={`/projects/${project.id}`} 
    //                                     style={{ 
    //                                         textDecoration: 'none',
    //                                         color: '#1976d2',
    //                                         fontWeight: 500
    //                                     }}
    //                                 >
    //                                     {project.title}
    //                                 </Link>
    //                             </Typography>
    //                             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
    //                                 {project.description}
    //                             </Typography>
    //                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
    //                                 {project.techStack?.map((tech) => (
    //                                     <Chip 
    //                                         key={tech} 
    //                                         label={tech} 
    //                                         size="small" 
    //                                         variant="outlined"
    //                                     />
    //                                 ))}
    //                             </Box>
    //                             <Stack direction="row" spacing={1}>
    //                                 {project.githubUrl && (
    //                                     <Button
    //                                         size="small"
    //                                         startIcon={<GitHubIcon />}
    //                                         href={project.githubUrl}
    //                                         target="_blank"
    //                                         sx={{ textTransform: 'none' }}
    //                                     >
    //                                         GitHub
    //                                     </Button>
    //                                 )}
    //                                 {project.liveUrl && (
    //                                     <Button
    //                                         size="small"
    //                                         startIcon={<LaunchIcon />}
    //                                         href={project.liveUrl}
    //                                         target="_blank"
    //                                         sx={{ textTransform: 'none' }}
    //                                     >
    //                                         Live
    //                                     </Button>
    //                                 )}
    //                             </Stack>
    //                         </Box>
    //                         <Box sx={{ display: 'flex', gap: 0.5 }}>
    //                             <Tooltip title="Open project details">  
    //                                 <IconButton
    //                                     size="small"
    //                                     to={`/projects/details/${project.id}`}
    //                                     component={Link}
    //                                 >
    //                                     <FolderOpenIcon />
    //                                 </IconButton>
    //                             </Tooltip>
    //                             <Tooltip title="Delete project">
    //                                 <IconButton
    //                                     size="small"
    //                                     color="error"
    //                                     onClick={() => handleDelete(project.id)}
    //                                 >
    //                                     <DeleteIcon />
    //                                 </IconButton>
    //                             </Tooltip>
    //                         </Box>
    //                     </Box>
    //                 </CardContent>
    //             </Card>
    //         ))}
    //     </Box>
    // );


    const renderListView = (filteredData) => {
        return (
            <Grid container spacing={3}>
                {filteredData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.title}
                                    height="140"
                                    sx={{ borderRadius: 2, objectFit: 'cover' }}
                                />
                            )}

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                                    {item.title}
                                </Typography>

                                <ButtonGroup>
                                    <Button
                                        size="small"
                                        component={Link}
                                        to={`/projects/details/${item.id}`}
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </Stack>

                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>

                            <Stack direction="row" flexWrap="wrap" spacing={1} mt={1}>
                                {item.techStack?.map((tech, idx) => (
                                    <Chip key={idx} label={tech} size="small" />
                                ))}
                            </Stack>

                            <Stack direction="row" spacing={1} mt="auto">
                                {item.githubUrl && (
                                    <Button
                                        size="small"
                                        startIcon={<GitHubIcon />}
                                        href={item.githubUrl}
                                        target="_blank"
                                    >
                                        GitHub
                                    </Button>
                                )}
                                {item.liveUrl && (
                                    <Button
                                        size="small"
                                        startIcon={<LaunchIcon />}
                                        href={item.liveUrl}
                                        target="_blank"
                                    >
                                        Live
                                    </Button>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        )
    };


    return (
        <CustomDataTable
            data={projectData}
            columns={columns}
            title="My Projects"
            description="Manage and showcase your development projects. Track your progress, organize your work, and share your achievements with the world."
            filters={filters}
            searchFields={searchFields}
            RenderAdditionButton={RenderAdditionButton}
            renderGridView={renderListView}
            viewMode={viewMode}
        />
    );
}

export default ProjectLayout;