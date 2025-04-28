'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid2';
import TattooArtistCard from "@/presentation/components/TattooArtistCard";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { GetAllTattooArtistUseCase } from "@/application/tattoo-artist/getAllTattooArtistUseCase";
import SearchBar from "@/presentation/components/SearchBar";
import FilterBox from "../components/FilterBox";
import TattooArtistList from "./TattooArtistList";
import TattooArtistSlider from "../components/TattooArtistSlider";
import Link from 'next/link';

export default function HomePage() {
//   const [artists, setArtists] = useState<TattooArtist[]>([]);
//   const [loading, setLoading] = useState(true);
//   const getAllTattooArtistUseCase = new GetAllTattooArtistUseCase(new TattooArtistApi());

//   useEffect(() => {
//     const fetchArtists = async () => {
//       try {
//         const data = await getAllTattooArtistUseCase.execute();
//         setArtists(data);
//       } catch (error) {
//         console.error("Erro ao buscar tatuadores:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArtists();
//   }, []);

//   if (loading) {
//     return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
//   }

return (
    <>
      <Stack spacing={4} alignItems="center">
        <Stack spacing={4} direction="row" alignItems="center">
          <SearchBar />
          <FilterBox />
        </Stack>
  
        <Button 
          variant="contained" 
          color="primary"
          sx={{ borderRadius: 6, width: '200px', height: '40px' }}
        >
          Search
        </Button>
  
        <Stack 
          direction="row" 
          alignItems="center" 
          spacing={2} 
          sx={{ mt: 8, mb: 4 }}
        >
          <Typography variant="h4" color="primary">
            Best Rated Artists
          </Typography>
  
          <Link href="/tattoo-artist" passHref style={{ textDecoration: 'none' }}>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{mt: 1, ml: 4}}>
              <Typography 
                variant="body1" 
                color="primary" 
                sx={{ cursor: 'pointer', fontWeight: 500 }}
              >
                View All
              </Typography>
              <ArrowForwardIosIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            </Stack>
          </Link>
        </Stack>
  
        <TattooArtistSlider />
      </Stack>
    </>
  );
}
