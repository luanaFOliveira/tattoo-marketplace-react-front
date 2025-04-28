'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '60%', sm: '40%', md: '30%', lg: '25rem' },
        height: '45px',
        borderRadius: '16px', 
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        backgroundColor: (theme) => theme.palette.secondary.main,
        mx: 'auto',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by artist name "
        inputProps={{ 'aria-label': 'search tattoo artist ' }}
      />
      <IconButton type="button" sx={{ p: '10px', color:"white" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
