'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Grid from '@mui/material/Grid2';
import QuoteCard from "@/presentation/components/QuoteCard";
import { QuoteApi } from "@/infra/api/quoteApi";
import { Quote } from "@/domain/entities/quote";
import { useAuth } from "@/presentation/context/AuthContext";  

export default function QuoteList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const { user} = useAuth(); 

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const api = new QuoteApi();
        if (user?.isTattooArtist){
            const data = await api.getAllQuotesByTattooArtist();
            setQuotes(data);
        }else{
            const data = await api.getAllQuotesByUser();
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

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {quotes.map((quote) => (
        <Grid key={quote.id} size={{ xs: 2, sm: 4, md: 3 }} component="div">
            <QuoteCard quote={quote} />
        </Grid>
        ))}
    </Grid>
  );
}
