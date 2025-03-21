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

const registerQuoteUseCase = new RegisterQuoteUseCase(new QuoteApi());


export default function QuoteRequestModal({ tattooArtist }: { tattooArtist: TattooArtist }) {
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
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
        } catch (error) {
          console.error("Erro no cadastro:", error);
          toast.error("Erro ao cadastrar quote.");
        } finally {
          setLoading(false);
        }
        handleClose();
    };
  
    return (
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Request Quote
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
              Requesting Quote for {tattooArtist.name}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField label="Descrição" name="description" variant="outlined" fullWidth required />
                <TextField label="Localização" name="placement" variant="outlined" fullWidth required />
                <TextField label="Cor" name="color" variant="outlined" fullWidth required />
                <TextField label="Tamanho (cm)" name="size" type="number" variant="outlined" fullWidth required />
  
                <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ marginBottom: "16px" }} />

                <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Cadastrar"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </div>
    );
}