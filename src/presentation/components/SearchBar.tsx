'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


// talvez fazer um searchbar podendo mandar se eh pra localizacao ou por nome ou por categoria
export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '90%', sm: '70%', md: '40%', lg: '30rem' },
        borderRadius: '16px', 
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        backgroundColor: (theme) => theme.palette.secondary.main,
        mx: 'auto',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by artist name or category"
        inputProps={{ 'aria-label': 'search tattoo artist or category' }}
      />
      <IconButton type="button" sx={{ p: '10px', color:"white" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
