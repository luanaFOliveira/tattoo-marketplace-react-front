'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, CardMedia, Box, Chip, Button } from "@mui/material";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import QuoteRequestModal from "@/presentation/components/QuoteRequestModal";
import { useAuth } from "@/presentation/context/AuthContext";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import Image from 'next/image'
import CardActions from '@mui/material/CardActions';
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; 
import { GetTattooArtistUseCase } from "@/application/tattoo-artist/getTattooArtistUseCase";
import ImageGallery from "@/presentation/components/ImageGallery";

export default function TattooArtistView({ tattooArtistId }: { tattooArtistId: string }) {
  const [artist, setArtist] = useState<TattooArtist | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user, isAuthenticated } = useAuth(); 
  const router = useRouter();
  const getTattooArtistUseCase = new GetTattooArtistUseCase(new TattooArtistApi());

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await getTattooArtistUseCase.execute(tattooArtistId);
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
    <Box sx={{ width: "100%", px: 2, mt: 5 }}>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          height: "100%", 
          gap: 0,
          justifyContent: "flex-start",
        }}
      >
          <Box sx={{ width: { xs: "100%", md: "400px" } }}>
          <Card sx={{ 
            height: "100%", 
            borderRadius: 2, 
            boxShadow: 3, 
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
            backgroundColor: (theme) => theme.palette.secondary.main 
          }}>
            <CardMedia
              component="img"
              image={`http://localhost:8089${artist.profilePicture}`}
              alt={artist.name}
              sx={{ width: "100%", height: 300, objectFit: "cover" }}
            />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" color="white" fontWeight="bold">
                {artist.name}
              </Typography>
              <Typography variant="body1" color="white" sx={{ mt: 1 }}>
                📍 {artist.location}
              </Typography>
              <Typography variant="body1" color="white">
                ⭐ {artist.rate} / 5
              </Typography>
              <Box mt={2}>
              {artist.categories.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {artist.categories.map((category) => (
                    <Chip key={category.id} label={category.name} sx={{ backgroundColor: "white" }} />
                  ))}
                </Box>
              )}     
              </Box>
            </CardContent>
          </Card>
        </Box>
  
        <Box sx={{ flex: 1, px: { xs: 2, md: 4 } }}>
          
        <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              mt: 1 
            }}
          >
            <Typography 
              color="primary" 
              variant="h4" 
              sx={{ fontWeight: "bold", textAlign: "center", flex: 1 }}
            >
              Portifolio
            </Typography>

            <Fab 
              size="medium"
              variant="extended"
              color="primary"
              onClick={handleQuoteRequest}
              aria-label="request-quote"
            >
              <AddIcon sx={{ mr: 1 }} /> Request Quote
            </Fab>
          </Box>

          {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Fab 
              size="medium"
              variant="extended"
              color="primary"
              onClick={handleQuoteRequest}
              aria-label="request-quote"
            >
              <AddIcon sx={{ mr: 1 }} /> Request Quote
            </Fab>
          </Box> */}

          <Box sx={{ mt: 3 }}>
            <ImageGallery images={artist.images} userId={artist.id} showAddButton={false} />
          </Box>
        </Box>
      </Box>
  
      <QuoteRequestModal 
        tattooArtist={artist} 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
      />
    </Box>
  );
  
  
}

