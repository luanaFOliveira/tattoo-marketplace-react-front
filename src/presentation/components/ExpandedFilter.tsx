import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
        <Typography variant="h6" color="white" align="center">
            Filters <FilterAltIcon />
        </Typography>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="realism">Realism</MenuItem>
          <MenuItem value="japanese">Japanese</MenuItem>
          <MenuItem value="geometric">Geometric</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          label="Location"
        >
          <MenuItem value="sao-paulo">São Paulo</MenuItem>
          <MenuItem value="rio-de-janeiro">Rio de Janeiro</MenuItem>
          <MenuItem value="curitiba">Curitiba</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
