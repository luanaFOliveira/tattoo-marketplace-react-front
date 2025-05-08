'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Divider,Typography, Avatar, Card, CardContent, CardMedia, Box, Chip, Button, Rating } from "@mui/material";
import { RateTattooArtistRequest, TattooArtist } from "@/domain/entities/tattoo-artist";
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
import RateReviewIcon from '@mui/icons-material/RateReview';
import RatingPopover from "@/presentation/components/RatingPopover";
import { RateTattooArtistUseCase } from "@/application/tattoo-artist/rateTattooArtistUseCase";

export default function TattooArtistView({ tattooArtistId }: { tattooArtistId: string }) {
  const [artist, setArtist] = useState<TattooArtist | null>(null);
  const [loading, setLoading] = useState(true);
  const [openQuoteModal, setOpenQuoteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [rating, setRating] = useState<number>(0); 
  const [rateTattooArtist, setRateTattooArtist] = useState<RateTattooArtistRequest>({
      rate: 0
  });
  const { user, isAuthenticated } = useAuth(); 
  const router = useRouter();
  const getTattooArtistUseCase = new GetTattooArtistUseCase(new TattooArtistApi());
  const rateTattooArtistUseCase = new RateTattooArtistUseCase(new TattooArtistApi());

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

  useEffect(() => {
    const rateArtist = async () => {
      try {
        const data = await rateTattooArtistUseCase.execute(tattooArtistId, rateTattooArtist);
        setArtist(data);
      } catch (error) {
        console.error("Erro ao buscar tatuador:", error);
        toast.error("Erro ao buscar tatuador");
      } finally {
        setLoading(false);
      }
    };
  
    rateArtist();
  }, []);
  

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!artist) {
    return <Typography variant="h6" color="error">Tatuador não encontrado</Typography>;
  }

  const handleQuoteRequest = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to request a quote.");
      router.push("/login");
    } else {
      setOpenQuoteModal(true);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to rate a tattoo artist.");
      router.push("/login");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleSubmitRating = async () => {
    setAnchorEl(null); 
  
    try {
      const updatedArtist = await rateTattooArtistUseCase.execute(tattooArtistId, rateTattooArtist);
      setArtist(updatedArtist);
      toast.success("Rating submitted successfully!");
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast.error("Failed to submit rating.");
    }
  };

  const handleClose = async () => {
    setAnchorEl(null); 
  };

  return(
    <Box sx={{ width: "100%", px: 2, mt: 10 }}>
      <Box 
        sx={{ 
          position: "relative", 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar 
          src={`http://localhost:8089${artist.profilePicture}`} 
          alt={artist.name}
          sx={{ width: 150, height: 150 }}
        />

        <Box>
          <Typography variant="h4" color="white" fontWeight="bold">
            {artist.name}
          </Typography>
          <Typography variant="body1" color="white" sx={{ mt: 1 }}>
            📍 {artist.location}
          </Typography>
          <Rating 
            name="read-only" 
            value={artist.rate} 
            precision={0.5} 
            readOnly 
            sx={{
            '& .MuiRating-iconEmpty': {
            color: 'white', 
            }
          }}/>
          <Typography variant="body1" color="white">
            ⭐ {artist.rate} / 5
          </Typography>

          {artist.categories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {artist.categories.map((category) => (
                <Chip key={category.id} label={category.name} color="primary" variant="outlined"/>
              ))}
            </Box>
          )}
        </Box>

        <Box  
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Fab 
            size="medium"
            variant="extended"
            color="primary"
            onClick={handleQuoteRequest}
            aria-label="request-quote"
            sx={{ px: 3 }}
          >
            <AddIcon sx={{ mr: 1 }} /> Request Quote
          </Fab>

          <Fab 
            size="small"
            variant="extended"
            onClick={handleButtonClick}
            aria-label="rate-artist"
            sx={{
              px: 2,
              backgroundColor: '#4b0082',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#5d1d9f',
                color: '#ffffff'
              }
            }}
          >
            <RateReviewIcon sx={{ mr: 1, fontSize: 16 }} /> Rate
          </Fab>
        </Box>


      </Box>

      <Divider sx={{ my: 4, color: "white", borderColor: "white", fontWeight: "bold" }}>
      </Divider>

      <Box sx={{ mt: 5 }}>
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            mb: 2 
          }}
        >
          <Typography 
            color="primary" 
            variant="h4" 
            sx={{ fontWeight: "bold", textAlign: "center", flex: 1 }}
          >
            Portifolio
          </Typography>
        </Box>

        <ImageGallery images={artist.images} userId={artist.id} showAddButton={false} />
      </Box>

      <QuoteRequestModal 
        tattooArtist={artist} 
        open={openQuoteModal} 
        onClose={() => setOpenQuoteModal(false)} 
      />
      <RatingPopover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        value={rateTattooArtist.rate}
        onChange={(newValue) => setRateTattooArtist({ rate: newValue ?? 0 })}
        onClose={handleClose}
        onSubmit={handleSubmitRating}
      />
    </Box>

  );
}