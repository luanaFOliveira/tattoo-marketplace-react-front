'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, CardMedia, Box, Grid } from "@mui/material";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import QuoteModal from "@/presentation/components/QuoteModal";

export default function TattooArtistView({ tattooArtistId }: { tattooArtistId: string }) {
  const [artist, setArtist] = useState<TattooArtist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const api = new TattooArtistApi();
        const data = await api.getTattooArtist(tattooArtistId);
        setArtist(data);
      } catch (error) {
        console.error("Erro ao buscar tatuador:", error);
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

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 5 }}>
      <Card sx={{ display: "flex", border: "2px solid #6A0DAD", borderRadius: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image="/placeholder.jpg"
          // image={artist.imageUrl || "/placeholder.jpg"} // Usa a imagem do artista ou um placeholder
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
        <QuoteModal/>
      </Card>
      <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Portfólio
      </Typography>

      {artist.images && artist.images.length > 0 ? (
        <Grid container spacing={2}>
          {artist.images.map((imageUrl, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box
                component="img"
                src={`http://localhost:8089${imageUrl}`}  
                alt={`Tattoo ${index + 1}`}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
          Nenhum trabalho no portfólio ainda.
        </Typography>
      )}

    </Box>
  );
}
