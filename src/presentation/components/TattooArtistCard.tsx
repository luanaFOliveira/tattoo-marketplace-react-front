import Link from "next/link";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { TattooArtist } from "@/domain/entities/tattoo-artist";

type Props = {
  artist: TattooArtist;
};

export default function TattooArtistCard({ artist }: Props) {
  return (
    <Link href={`/tattoo-artist/${artist.id}`} passHref style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, position: "relative", p: 1, backgroundColor: "#2c2c2c", cursor: "pointer" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" color="white">
              {artist.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <StarIcon sx={{ color: "gold", fontSize: 18 }} />
              <Typography variant="body2" color="white" sx={{ ml: 0.5 }}>
                {artist.rate ?? "N/A"}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationOnOutlinedIcon sx={{ color: "white", fontSize: 18 }} />
            <Typography variant="body2" color="white">
              {artist.location}
            </Typography>
          </Box>
          {artist.categories.length > 0 && <Chip label={artist.categories[0]?.name} sx={{ mt: 1, backgroundColor: "white" }} />}
        </CardContent>
      </Card>
    </Link>
  );
}
