'use client';
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { QuoteApi } from "@/infra/api/quoteApi";
import { QuoteExtended } from "@/domain/entities/quote";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

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

export default function QuoteViewModal({
  quoteId,
  open,
  handleClose,
}: {
  quoteId: string;
  open: boolean;
  handleClose: () => void;
}) {
  const [quote, setQuote] = useState<QuoteExtended | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const api = new QuoteApi();
        const data = await api.getQuote(quoteId);
        setQuote(data);
      } catch (error) {
        console.error("Erro ao buscar orçamento:", error);
        toast.error("Erro ao buscar orçamento");
      } finally {
        setLoading(false);
      }
    };

    if (quoteId) {
      setLoading(true);
      fetchQuote();
    }
  }, [quoteId]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6">{quote?.description}</Typography>
            <Typography variant="body2">{quote?.placement}</Typography>
            <Typography variant="body2">{quote?.size}</Typography>
            <Typography variant="body2">{quote?.color}</Typography>
            <Typography variant="body2">{quote?.price}</Typography>
            <Typography variant="body2">{quote?.tattooArtist?.name}</Typography>
            <Typography variant="body2">{quote?.status?.name}</Typography>
            <Button onClick={handleClose}>Fechar</Button>
          </>
        )}
      </Box>
    </Modal>
  );
}
