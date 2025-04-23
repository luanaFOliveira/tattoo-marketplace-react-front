'use client';
import React, { useState, useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Grid from '@mui/material/Grid2';
import { toast } from 'react-toastify';
import { TattooArtistApi } from '@/infra/api/tattooArtistApi';
import { AddPortifolioImagesUseCase } from '@/application/tattoo-artist/addPortifolioImagesUseCase';
import { Dialog, DialogContent } from '@mui/material';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


type ImageGalleryProps = {
  images: string[];
  userId: number;
  showAddButton?: boolean;
};

export default function ImageGallery({ images: initialImages, userId, showAddButton }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const addPortifolioImagesUseCase = new AddPortifolioImagesUseCase(new TattooArtistApi());

  const handleSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);

    setLoading(true);
    try {
      const updatedUser = await addPortifolioImagesUseCase.execute(userId.toString(), selectedFiles);

      toast.success("Imagem(ns) enviada(s) com sucesso!");
      window.location.reload();
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
        {showAddButton && (
          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <Fab
              color="primary"
              aria-label="edit"
              variant="extended"
              onClick={triggerFileSelect}
            >
              <AddIcon sx={{ mr: 1 }} /> Adicionar Foto
            </Fab>
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              onChange={handleSelectImages}
            />
          </Grid>
        )}
        {images?.map((img, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card>
            <CardMedia
                component="img"
                image={`http://localhost:8089${img}`}
                sx={{
                    height: 200,
                    width: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                }}
                onClick={() => setSelectedImage(img)}
            />
            </Card>
          </Grid>
        ))}

      </Grid>
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent sx={{ p: 0 }}>
            <img
            src={`http://localhost:8089${selectedImage}`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
