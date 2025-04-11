'use client';
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { QuoteRequest } from "@/domain/entities/quote";
import { toast } from "react-toastify";
import { RegisterQuoteUseCase } from "@/application/quote/registerQuoteUseCase";
import { QuoteApi } from "@/infra/api/quoteApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "@/presentation/context/AuthContext"; 
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const registerQuoteUseCase = new RegisterQuoteUseCase(new QuoteApi());

export default function QuoteRequestModal({ 
  tattooArtist, 
  open, 
  onClose 
}: { 
  tattooArtist: TattooArtist; 
  open: boolean; 
  onClose: () => void; 
}) {
  const { user } = useAuth();

  const [quote, setQuote] = useState<QuoteRequest>({
    description: "",
    placement: "",
    color: "",
    size: 0,
    userId: user ? user.id : 0,
    tattooArtistId: tattooArtist ? tattooArtist.id : 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuote((prevQuote) => ({
      ...prevQuote,
      [name]: name === "size" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (isNaN(quote.size) || quote.size <= 0) {
      toast.error("Tamanho inválido.");
      setLoading(false);
      return;
    }

    try {
      const { id } = await registerQuoteUseCase.execute(quote, images);
      console.log("Quote cadastrado:", id);
      toast.success("Cadastro realizado com sucesso.");
      onClose(); 
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Box sx={{ backgroundColor: (theme) => theme.palette.primary.main, padding: 1, borderRadius: 1, marginBottom: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2" color="white" >
            Requesting Quote for {tattooArtist.name}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">
              Description
            </Typography>
            <TextField
              name="description"
              variant="outlined"
              value={quote.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={2}
              placeholder="Describe your tattoo idea..."
            />
            <Typography variant="subtitle1">
              Tattoo Placement
            </Typography>
            <TextField
              name="placement"
              variant="outlined"
              value={quote.placement}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., Arm, Leg, Back..."
            />
          <Stack direction="row" spacing={2} width="100%">
            <Stack width="50%">
              <Typography variant="subtitle1">Color</Typography>
              <TextField
                name="color"
                variant="outlined"
                value={quote.color}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g.,Black, Red..."
              />
            </Stack>
            <Stack width="50%">
              <Typography variant="subtitle1">Size (cm)</Typography>
              <TextField
                name="size"
                type="number"
                variant="outlined"
                value={quote.size}
                onChange={handleChange}
                fullWidth
                required
              />
            </Stack>
          </Stack>
          <Typography variant="subtitle1">
            Tattoo reference images
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </Button>

            {images.length > 0 && (
              <Typography variant="body2">{images.length} image(s) selected</Typography>
            )}

            {/* <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {images.map((image, index) => (
                <Box key={index} sx={{ width: 80, height: 80, margin: 1 }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`preview-${index}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box> */}
          </Box>

            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Cadastrar"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
