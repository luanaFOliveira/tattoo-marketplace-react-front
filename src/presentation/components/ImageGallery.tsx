'use client';
import React, { useState, useRef } from 'react';
import { Card, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { toast } from 'react-toastify';
import { TattooArtistApi } from '@/infra/api/tattooArtistApi';
import { AddPortifolioImagesUseCase } from '@/application/tattoo-artist/addPortifolioImagesUseCase';
import { Dialog, DialogContent } from '@mui/material';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';


type ImageGalleryProps = {
  images: string[];
  userId: number;
  showAddButton?: boolean;
};

export default function ImageGallery({ images: initialImages, userId, showAddButton }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const addPortifolioImagesUseCase = new AddPortifolioImagesUseCase(new TattooArtistApi());

  const handleSelectImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files);

    try {
      const updatedUser = await addPortifolioImagesUseCase.execute(userId.toString(), selectedFiles);

      toast.success("Images submited successfully!");
      window.location.reload();
      setImages(updatedUser.images);
    } catch (err) {
      console.error("Failed to submit images:", err);
      toast.error("Failed to submit images");
    } finally {
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
              <AddIcon sx={{ mr: 1 }} /> Add new image
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
              <Box
                sx={{
                  height: 200,
                  width: '100%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`}
                  alt={`Portifolio image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </Box>
            </Card>
          </Grid>
        ))}

      </Grid>
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent sx={{ p: 0 }}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${selectedImage}`}
          alt="Selected Image"
          fill
          style={{ width: '100%', height: 'auto', display: 'block' }}
          unoptimized 
        />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
