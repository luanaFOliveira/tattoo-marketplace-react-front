'use client';
import * as React from 'react';
import { Button, Menu, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterBox() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [category, setCategory] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={handleClick}
        sx={{
            textTransform: 'none',
            borderRadius: 2,
            height: '43px',        
            backgroundColor: (theme) => theme.palette.secondary.main,
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
            color: 'white',
          }}
      >
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { p: 2, minWidth: 250 },
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="realism">Realism</MenuItem>
              <MenuItem value="japanese">Japanese</MenuItem>
              <MenuItem value="geometric">Geometric</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="sao-paulo">São Paulo</MenuItem>
              <MenuItem value="rio-de-janeiro">Rio de Janeiro</MenuItem>
              <MenuItem value="curitiba">Curitiba</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </div>
  );
}
