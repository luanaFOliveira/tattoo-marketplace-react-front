'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Stack,Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TattooArtistCard from "@/presentation/components/TattooArtistCard";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { GetAllTattooArtistUseCase } from "@/application/tattoo-artist/getAllTattooArtistUseCase";
import SearchBar from "@/presentation/components/SearchBar";
import FilterBox from "../components/FilterBox";
import ExpandedFilter from "../components/ExpandedFilter";

export default function TattooArtistList() {
  const [artists, setArtists] = useState<TattooArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const getAllTattooArtistUseCase = new GetAllTattooArtistUseCase(new TattooArtistApi());

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllTattooArtistUseCase.execute();
        setArtists(data);
      } catch (error) {
        console.error("Erro ao buscar tatuadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
    {/* Filtro no canto esquerdo */}
    <Box sx={{ width: '250px' }}>
      <ExpandedFilter />
    </Box>

    {/* Lista de Cards começa ao lado do filtro */}
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={4}>
        <SearchBar />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {artists.map((artist) => (
            <Grid key={artist.id} size={{ xs: 2, sm: 4, md: 3 }} component="div">
              <TattooArtistCard artist={artist} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  </Box>
    // <Stack spacing={4}>  
    //   <SearchBar />
    //   <ExpandedFilter />
    //   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //       {artists.map((artist) => (
    //       <Grid key={artist.id} size={{ xs: 2, sm: 4, md: 3 }} component="div">
    //           <TattooArtistCard artist={artist} />
    //       </Grid>
    //       ))}
    //   </Grid>
    // </Stack>
  );
}
