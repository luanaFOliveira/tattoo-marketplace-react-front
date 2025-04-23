'use client';
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Quote } from "@/domain/entities/quote";
import StatusChip from "@/presentation/components/StatusChip";
import { useAuth } from "@/presentation/context/AuthContext";

type Props = {
  quote: Quote;
  onClick: () => void;
};

export default function QuoteCard({ quote, onClick }: Props) {
  const { user } = useAuth();
    return (
      <Card
        sx={{
          maxWidth: 345,
          position: "relative",
          p: 1,
          backgroundColor: (theme) => theme.palette.secondary.main,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {user?.isTattooArtist ? (
              <Typography color="white"><strong>From:</strong> {quote?.user?.name}</Typography>
            ) : (
              <Typography color="white"><strong>To:</strong> {quote?.tattooArtist?.name}</Typography>
            )}
            <StatusChip status={quote.status.name} /> 
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="white">
              {quote.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }
