import Link from "next/link";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Quote } from "@/domain/entities/quote";

type Props = {
  quote: Quote;
};

export default function QuoteCard({ quote }: Props) {
  return (
    <Link href={`/quote/${quote.id}`} passHref style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, position: "relative", p: 1, backgroundColor: "#2c2c2c", cursor: "pointer" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" color="white">
              {/* {quote.description} */}
              descricao
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="white" sx={{ ml: 0.5 }}>
                {/* {quote.tattooArtist.name} */}
                artista
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="white">
              {/* {quote.status.name} */}
              status
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
