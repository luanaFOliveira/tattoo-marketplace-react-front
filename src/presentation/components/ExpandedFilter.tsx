import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, SelectChangeEvent, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { StyledSelect } from '@/app/StyledRoot';
import { Category } from '@/domain/entities/category';

interface Props {
    category: string;
    location: string;
    setCategory: (value: string) => void;
    setLocation: (value: string) => void;
    handleFilters: () => void;
    categories: Category[];
    locations: string[];
}

export default function ExpandedFilter({
    category,
    location,
    setCategory,
    setLocation,
    handleFilters,
    categories,
    locations,
  }: Props) 
 {
  
  return (
    <Box
      sx={{
        position: 'fixed', 
        left: '1rem', 
        padding: 2,
        display: 'flex',
        flexDirection: 'column', 
        gap: 2, 
        background: (theme) => theme.palette.secondary.main,
        width: '250px', 
        borderRadius: '10px', 
        height: 'auto', 
        boxShadow: 3, 
      }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterAltIcon sx={{ mr: 0.5 }} /> Filters
            </Typography>
            <Button
                onClick={handleFilters}
                variant="contained"
                size="small"
                sx={{
                color: '#ffffff',
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: '20px',
                paddingX: 3,
                paddingY: 0.5,
                marginLeft: 5,
                minWidth: 'auto',
                textTransform: 'none',
                fontSize: '0.75rem',
                '&:hover': {
                    backgroundColor: '#b44ee6',
                },
                }}
            >
                Apply
            </Button>
        </Box>

        <FormControl fullWidth>
            <InputLabel sx={{color:"white"}}>Category</InputLabel>
            <StyledSelect
                value={category}
                onChange={(e: SelectChangeEvent<unknown>) => setCategory(e.target.value as string)}
                label="Category"
            >
            {categories.map((cat: Category) => (
                <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                </MenuItem>
            ))}
            </StyledSelect>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel sx={{color:"white"}}>Location</InputLabel>
            <StyledSelect
                value={location}
                onChange={(e: SelectChangeEvent<unknown>) => setLocation(e.target.value as string)}
                label="Location"
            >
            {locations.map((loc: string) => (
                <MenuItem key={loc} value={loc}>
                    {loc}
                </MenuItem>
            ))}
            </StyledSelect>
        </FormControl>
    </Box>
  );
}
