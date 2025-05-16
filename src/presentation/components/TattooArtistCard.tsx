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
      <Card sx={{ maxWidth: 1000, position: "relative", p: 1, backgroundColor: (theme) => theme.palette.secondary.main, cursor: "pointer" }}>
        <CardMedia
          component="img"
          image={`${process.env.NEXT_PUBLIC_API_BASE_URL}${artist.profilePicture}`}
          alt={artist.name}
          sx={{
            width: "100%",
            height: 200, 
            objectFit: "cover",
            borderRadius: "5px 5px 0 0" 
          }}
        />

        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" color="white">
              {artist.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="white" sx={{ mr: 0.5 }}>
                {artist.rate ?? "N/A"}
              </Typography>
              <StarIcon sx={{ color: "gold", fontSize: 18 }} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationOnOutlinedIcon sx={{ color: "white", fontSize: 18 }} />
            <Typography variant="body2" color="white">
              {artist.location}
            </Typography>
          </Box>
          {artist.categories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {artist.categories.map((category) => (
                <Chip key={category.id} label={category.name} sx={{ backgroundColor: "white" }} />
              ))}
            </Box>
          )}        
        </CardContent>
      </Card>
    </Link>
  );
}
