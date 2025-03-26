'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, CardMedia, Box, Grid, Button } from "@mui/material";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import QuoteModal from "@/presentation/components/QuoteModal";
import { useAuth } from "@/presentation/context/AuthContext";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import Image from 'next/image'

export default function TattooArtistView({ tattooArtistId }: { tattooArtistId: string }) {
  const [artist, setArtist] = useState<TattooArtist | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user, isAuthenticated } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const api = new TattooArtistApi();
        const data = await api.getTattooArtist(tattooArtistId);
        setArtist(data);
      } catch (error) {
        console.error("Erro ao buscar tatuador:", error);
        toast.error("Erro ao buscar tatuador");
      } finally {
        setLoading(false);
       
      }
    };

    fetchArtist();
  }, [tattooArtistId]);

  if (loading) {
    
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!artist) {
    return <Typography variant="h6" color="error">Tatuador não encontrado</Typography>;
  }


  const handleQuoteRequest = () => {
    if (!isAuthenticated) {
      toast.error("Para solicitar um orçamento é necessário estar logado");
      router.push("/login");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 5 }}>
      <Card sx={{ display: "flex", border: "2px solid #6A0DAD", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={`http://localhost:8089${artist.profilePicture}`}
        alt={artist.name}
        sx={{ width: 300, height: "100%", objectFit: "cover", borderRadius: "5px 0 0 5px" }}
      />
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: 3 }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            {artist.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            📍 {artist.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ⭐ {artist.rate} / 5
          </Typography>
          <Box mt={2}>
            {artist.categories?.map((category, index) => (
              <Typography key={index} variant="body2" color="secondary" sx={{ display: "inline", mr: 1 }}>
                #{category.name}
              </Typography>
            ))}
          </Box>
          
        </CardContent>
        <Button variant="contained" color="primary" onClick={handleQuoteRequest}>
          Solicitar Orçamento
        </Button>
        {openModal && <QuoteModal tattooArtist={artist} />}
      </Card>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Portfólio
      </Typography>

      {artist.images?.length > 0 ? (
      <Grid container spacing={2}>
        {artist.images.map((image, index) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                component="img"
                src={`http://localhost:8089${image}`}
                alt={`Tattoo ${index + 1}`}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    ) : (
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
        Nenhum trabalho no portfólio ainda.
      </Typography>
    )}
    </Box>
  );
}
