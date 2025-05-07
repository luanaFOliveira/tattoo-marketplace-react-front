import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography, SelectChangeEvent } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { StyledSelect } from '@/app/StyledRoot';


export default function ExpandedFilter() {
  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');

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
        <Typography variant="h6" color="primary" align="center">
            <FilterAltIcon /> Filters 
        </Typography>
        <FormControl fullWidth>
            <InputLabel sx={{color:"white"}}>Category</InputLabel>
            <StyledSelect
                value={category}
                onChange={(e: SelectChangeEvent<unknown>) => setCategory(e.target.value as string)}
                label="Category"
            >
            <MenuItem value="realism">Realism</MenuItem>
            <MenuItem value="japanese">Japanese</MenuItem>
            <MenuItem value="geometric">Geometric</MenuItem>
            </StyledSelect>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel sx={{color:"white"}}>Location</InputLabel>
            <StyledSelect
                value={location}
                onChange={(e: SelectChangeEvent<unknown>) => setLocation(e.target.value as string)}
                label="Location"
            >
            <MenuItem value="sao-paulo">São Paulo</MenuItem>
            <MenuItem value="rio-de-janeiro">Rio de Janeiro</MenuItem>
            <MenuItem value="curitiba">Curitiba</MenuItem>
            </StyledSelect>
        </FormControl>
    </Box>
  );
}
