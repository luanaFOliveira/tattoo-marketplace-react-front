'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import QuoteCard from "@/presentation/components/QuoteCard";
import { QuoteApi } from "@/infra/api/quoteApi";
import { Quote } from "@/domain/entities/quote";
import { useAuth } from "@/presentation/context/AuthContext";  
import QuoteViewModal from "@/presentation/components/QuoteViewModal";
import StatusFilterButton from "@/presentation/components/StatusFilterButton";
import { GetAllQuotesByUserUseCase } from "@/application/quote/getAllQuotesByUserUseCase";
import { GetAllQuotesByTattooArtistUseCase } from "@/application/quote/getAllQuotesByTattooArtistUseCase";

export default function QuoteList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const { user} = useAuth(); 
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const getAllQuotesByUserUseCase = new GetAllQuotesByUserUseCase(new QuoteApi());
  const getAllQuotesByTattooArtistUseCase = new GetAllQuotesByTattooArtistUseCase(new QuoteApi());

  const handleOpenModal = (quoteId: number) => {
    setSelectedQuoteId(quoteId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedQuoteId(null);
    setOpen(false); 
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const api = new QuoteApi();
        if (user?.isTattooArtist){
          const data = await getAllQuotesByTattooArtistUseCase.execute();
          setQuotes(data);
        }else{
          const data = await getAllQuotesByUserUseCase.execute();
          setQuotes(data);
        }
      } catch (error) {
        console.error("Erro ao buscar quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  const handleFilterChange = (status: string | null) => {
    if (status === null) {
      setFilteredQuotes(quotes);
    } else {
      setFilteredQuotes(quotes.filter((quote) => quote.status.name.toLowerCase() === status));
    }
  };

  return (<>
    <Grid container spacing={1}  direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h4" color="white" fontWeight="bold" mt={2}>
            My Quotes
        </Typography>
        {/* <StatusFilterButton onFilterChange={handleFilterChange} /> */}
    </Grid>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {quotes.map((quote) => (
        <Grid key={quote.id} size={{ xs: 2, sm: 4, md: 3 }} component="div">
            <QuoteCard quote={quote} onClick={() => handleOpenModal(quote.id)} />
        </Grid>
        ))}
        {selectedQuoteId && (
          <QuoteViewModal
            quoteId={selectedQuoteId.toString()}
            open={open} 
            handleClose={handleCloseModal} 
          />
        )}
    </Grid>
    </>);
}
