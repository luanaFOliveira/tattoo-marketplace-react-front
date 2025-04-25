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
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 600 },
  bgcolor: "background.paper",
  borderRadius: 3,
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
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            padding: 2,
            marginX: -4, 
            marginTop: -4, 
            marginBottom: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            textAlign: 'center'
          }}
        >          
          <Typography id="modal-title" variant="h6" component="h2" color="white" >
            Requesting Quote for {tattooArtist.name}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Tattoo Details
          </Typography>

          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            value={quote.description}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            name="placement"
            label="Placement"
            placeholder="e.g., Arm, Leg, Back..."
            value={quote.placement}
            onChange={handleChange}
            fullWidth
            required
          />

          <Stack direction="row" spacing={2}>
            <TextField
              name="color"
              label="Color"
              value={quote.color}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="size"
              type="number"
              label="Size (cm)"
              value={quote.size}
              onChange={handleChange}
              fullWidth
              required
            />
          </Stack>

          <Divider />

          <Typography variant="h6" color="primary" fontWeight="bold">
            Reference Images
          </Typography>

          <Button
            component="label"
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </Button>

          {images.length > 0 && (
            <Box>
              <Typography variant="body2">{images.length} image(s) selected</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
                {images.map((image, index) => (
                  <Box key={index} sx={{ width: 80, height: 80, borderRadius: 2, overflow: "hidden" }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2, fontWeight: 'bold' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Request"}
          </Button>
        </Stack>

        </form>
      </Box>
    </Modal>
  );
}
