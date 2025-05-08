'use client';
import React, { useEffect, useState } from "react";
import { RegisterTattooArtistUseCase } from "@/application/tattoo-artist/registerTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { toast } from "react-toastify";
import { Paper, Button, CircularProgress, Box } from "@mui/material";
import { TattooArtistRequest } from "@/domain/entities/tattoo-artist";
import MultiSelect from "@/presentation/components/MultiSelect"; 
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import UserRegisterForm from "@/presentation/components/UserForm";
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';

const registerTattooArtistUseCase = new RegisterTattooArtistUseCase(new TattooArtistApi());
export default function TattooArtistRegister() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid  size={{ xs: 12, sm:6 , md: 12 }}>
          <Paper sx={{ gap: 4, padding: 4, boxShadow: 3, borderRadius: 2, height: "35rem", display: "flex", justifyContent: "center" }}>
            <UserRegisterForm userType="tattooArtist" registerUseCase={registerTattooArtistUseCase} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );  
}