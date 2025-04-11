'use client';
import React, { useState, useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Grid from '@mui/material/Grid2';
import { toast } from 'react-toastify';
import { TattooArtistApi } from '@/infra/api/tattooArtistApi';
import { AddPortifolioImagesUseCase } from '@/application/tattoo-artist/addPortifolioImagesUseCase';

type ImageGalleryProps = {
  images: string[];
  userId: number;
};

export default function ImageGallery({ images: initialImages, userId }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addPortifolioImagesUseCase = new AddPortifolioImagesUseCase(new TattooArtistApi());

  const handleSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);

    setLoading(true);
    try {
      const updatedUser = await addPortifolioImagesUseCase.execute(userId.toString(), selectedFiles);

      toast.success("Imagem(ns) enviada(s) com sucesso!");

      setImages(updatedUser.images);
    } catch (err) {
      console.error("Erro ao enviar imagens:", err);
      toast.error("Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => {
    inputRef.current?.click();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8089${img}`}
                alt={`Image ${index + 1}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Image {index + 1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Button
            variant="outlined"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={triggerFileSelect}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Adicionar Nova Foto'}
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={handleSelectImages}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
