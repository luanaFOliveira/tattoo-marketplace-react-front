import { Box, Container, Typography, Stack } from "@mui/material";
import Link from "next/link";
import Navbar from "../presentation/components/Navbar";
import SearchBar from "@/presentation/components/SearchBar";
import TattooArtistList from "@/presentation/pages/TattooArtistList";
import HomePage from "@/presentation/pages/HomePage";

export default function Home() {
  return (
    <main>
      <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start", 
            textAlign: "center",
            p: 4,
            pt: 0, 
        }}
      >
        <Typography variant="h4" color="primary" align="center">
            Find The Perfect Tattoo Artist For Your Next Piece
        </Typography>
        <Typography variant="h6" color="primary" align="center" sx={{ mt: 4, mb: 4 }}>
            Search by name, category or location
        </Typography>
        <HomePage />
        
      </Box>
      <Box
        sx={{
          width: { xs: "70%", md: "50%" },
          height: "70%",
          backgroundImage: 'url("/home-page.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center", 
        }}
      />

    </Box>
    {/* <TattooArtistList /> */}

      {/* <Container maxWidth="xl" sx={{marginTop: 5 }}>
        <Stack spacing={4}>  
          <Typography variant="h4" color="primary" align="center">
            Find the perfect tattoo artist for your next piece
          </Typography>
          <TattooArtistList />
        </Stack>
      </Container> */}
    </main>
  );
}
