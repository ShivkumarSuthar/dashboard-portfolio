import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    TextField,
    MenuItem,
    Card,
    CardContent,
    InputAdornment,
    Menu
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

// Reusable Data Table Component
const CustomDataTable = ({
    data=[],
    columns=[],
    title=null,
    description=null,
    viewMode = 'table',
    filters = [],
    searchFields = [],
    renderGridView=null,
    RenderAdditionButton= null
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterValues, setFilterValues] = useState({});
    const [anchorEl, setAnchorEl] = useState({});

    // Initialize filter values
    useEffect(() => {
        const initialFilters = {};
        filters.forEach(filter => {
            initialFilters[filter.key] = 'all';
        });
        setFilterValues(initialFilters);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleReset = () => {
        setSearchTerm('');
        const resetFilters = {};
        filters.forEach(filter => {
            resetFilters[filter.key] = 'all';
        });
        setFilterValues(resetFilters);
    };

    // Filter data based on search and filters
    const filteredData = data.filter(item => {
        // Search filter
        const matchesSearch = searchFields.length === 0 ||
            searchFields.some(field =>
                item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );

        // Custom filters
        const matchesFilters = filters.every(filter => {
            if (filterValues[filter.key] === 'all') return true;

            if (filter.filterFn) {
                return filter.filterFn(item, filterValues[filter.key]);
            }

            return item[filter.key] === filterValues[filter.key];
        });

        return matchesSearch && matchesFilters;
    });

    return (
        <Box sx={{ p: 3 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </Box>

            {/* Main Content Card */}
            <Card sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: 3 }}>
                    {/* Controls Section */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        gap: 2
                    }}>
                        {/* Left Side - Search and Filters */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {searchFields.length > 0 && (
                                <TextField
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    size="small"
                                    sx={{
                                        width: 200,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            bgcolor: 'white'
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}

                            {filters.map((filter) => (
                                <Button
                                    key={filter.key}
                                    variant="outlined"
                                    size="small"
                                    endIcon={<span style={{ fontSize: '12px' }}>▼</span>}
                                    onClick={(e) => setAnchorEl({ ...anchorEl, [filter.key]: e.currentTarget })}
                                    sx={{
                                        minWidth: filter.width || 120,
                                        height: 36,
                                        textTransform: 'none',
                                        color: 'text.secondary',
                                        borderColor: 'divider',
                                        bgcolor: 'white',
                                        justifyContent: 'space-between',
                                        '&:hover': {
                                            bgcolor: 'grey.50'
                                        }
                                    }}
                                >
                                    {filterValues[filter.key] === 'all' ? filter.label :
                                        filter.options.find(opt => opt.value === filterValues[filter.key])?.label || filter.label}
                                </Button>
                            ))}

                            {filters.map((filter) => (
                                <Menu
                                    key={`menu-${filter.key}`}
                                    anchorEl={anchorEl[filter.key]}
                                    open={Boolean(anchorEl[filter.key])}
                                    onClose={() => setAnchorEl({ ...anchorEl, [filter.key]: null })}
                                    PaperProps={{
                                        sx: {
                                            minWidth: filter.width || 120,
                                            mt: 1,
                                            boxShadow: 2
                                        }
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleFilterChange(filter.key, 'all');
                                            setAnchorEl({ ...anchorEl, [filter.key]: null });
                                        }}
                                        selected={filterValues[filter.key] === 'all'}
                                    >
                                        All
                                    </MenuItem>
                                    {filter.options.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            onClick={() => {
                                                handleFilterChange(filter.key, option.value);
                                                setAnchorEl({ ...anchorEl, [filter.key]: null });
                                            }}
                                            selected={filterValues[filter.key] === option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            ))}

                            {(filters.length > 0 || searchFields.length > 0) && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleReset}
                                    sx={{
                                        textTransform: 'none',
                                        bgcolor: '#d32f2f',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#b71c1c'
                                        },
                                        borderRadius: 1
                                    }}
                                >
                                    Reset
                                </Button>
                            )}
                        </Stack>

                        {/* Right Side - View Mode and Add Button */}
                        {RenderAdditionButton && <RenderAdditionButton/>}
                    </Box>

                    {/* Content Section */}
                    {viewMode === 'table' ? (
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={filteredData}
                                columns={columns}
                                checkboxSelection={false}
                                disableSelectionOnClick={true}  // This is the key prop for v5
                                disableColumnMenu={true}
                                hideFooterSelectedRowCount={true}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[10, 25, 50]}
                                sx={{
                                    '& .MuiDataGrid-cell': {
                                        py: 1,
                                        outline: 'none',
                                    },
                                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                                        outline: 'none',
                                    },
                                    '& .MuiDataGrid-columnHeader': {
                                        fontWeight: 600,
                                        outline: 'none',
                                    },
                                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                                        outline: 'none',
                                    },
                                    border: 'none',
                                    '& .MuiDataGrid-row:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                    '& .MuiDataGrid-row.Mui-selected': {
                                        backgroundColor: 'transparent',
                                    },
                                    '& .MuiDataGrid-row.Mui-selected:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}

                                isRowSelectable={() => false}

                            />
                        </Box>
                    ) : (
                        renderGridView && renderGridView(filteredData)
                    )}

                    {filteredData.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                No items found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Try adjusting your search or filters, or add a new item to get started.
                            </Typography>
                        </Box>
                    )}
                    
                </CardContent>
            </Card>
        </Box>
    );
};

export default CustomDataTable;