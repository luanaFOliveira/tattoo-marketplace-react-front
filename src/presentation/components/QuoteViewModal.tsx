'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  Stack,
  Divider,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { QuoteApi } from "@/infra/api/quoteApi";
import { QuoteExtended, UpdateQuote } from "@/domain/entities/quote";
import { toast } from "react-toastify";
import { GetQuoteUseCase } from "@/application/quote/getQuoteUseCase";
import { useAuth } from "@/presentation/context/AuthContext";
import { Status } from "@/domain/entities/status"
import { StatusApi } from "@/infra/api/statusApi";
import { GetAllStatusUseCase } from "@/application/status/getAllStatusUseCase";
import { UpdateQuoteUseCase } from "@/application/quote/updateQuoteUseCase";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt:8
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
  const [isEditing, setIsEditing] = useState(false);
  const [updateQuote, setUpdateQuote] = useState<UpdateQuote>({
    price: 0,
    statusId: 0,
  });

  const [statusOptions, setStatusOptions] = useState<Status[]>([]);


  const getQuoteUseCase = new GetQuoteUseCase(new QuoteApi());
  const getAllStatusUseCase = new GetAllStatusUseCase(new StatusApi());
  const updateQuoteUseCase = new UpdateQuoteUseCase(new QuoteApi());

  const { user } = useAuth();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const data = await getQuoteUseCase.execute(quoteId);
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

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getAllStatusUseCase.execute();
        setStatusOptions(data); 
      } catch (error) {
        console.error("Erro ao buscar status:", error);
        toast.error("Erro ao carregar opções de status.");
      }
    };
  
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (quote) {
      setUpdateQuote({
        price: quote.price,
        statusId: quote.status.id,
      });
    }
  }, [quote]);

  const handleSave = async () => {
    try {
      const data = await updateQuoteUseCase.execute(quoteId, updateQuote);
      setQuote(prev => ({
        ...prev!,
        ...data
      }));
      toast.success("Orçamento atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error("Erro ao salvar alterações.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2}>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                padding: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" color="white" fontWeight="bold">
                Quote Information
              </Typography>
            </Box>

  
            {/* CONTEÚDO DO MODAL */}
            <Typography><strong>Description:</strong> {quote?.description}</Typography>
            <Typography><strong>Location:</strong> {quote?.placement}</Typography>
            <Typography><strong>Size:</strong> {quote?.size}</Typography>
            <Typography><strong>Color:</strong> {quote?.color}</Typography>
            {user?.isTattooArtist ? (
              <Typography><strong>Client:</strong> {quote?.user?.name}</Typography>
            ) : (
              <Typography><strong>Tattoo Artist:</strong> {quote?.tattooArtist?.name}</Typography>
            )}
  
            {isEditing ? (
              <>
                <Box>
                  <Typography><strong>Price:</strong></Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={updateQuote.price ?? 0}
                    onChange={(e) =>
                      setUpdateQuote((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value)
                      }))
                    }
                    size="small"
                  />
                </Box>
  
                <Box>
                  <Typography><strong>Status:</strong></Typography>
                  <Select
                    fullWidth
                    value={updateQuote.statusId ?? ""}
                    onChange={(e) =>
                      setUpdateQuote((prev) => ({
                        ...prev,
                        statusId: Number(e.target.value)
                      }))
                    }
                    size="small"
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status.id} value={status.id}>
                        {status.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </>
            ) : (
              <>
                <Typography><strong>Price:</strong> R$ {quote?.price}</Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <span style={{
                    color: quote?.status?.name === "Approved" ? "green" :
                          quote?.status?.name === "Rejected" ? "red" : "gray"
                  }}>
                    {quote?.status?.name}
                  </span>
                </Typography>
              </>
            )}
  
            <Box display="flex" justifyContent="space-between" pt={2}>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
  
              {user?.isTattooArtist && (
                isEditing ? (
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                    Evaluate
                  </Button>
                )
              )}
            </Box>
          </Stack>
        )}
      </Box>
    </Modal>
  );
  
}
