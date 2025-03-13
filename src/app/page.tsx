import { Button, Container, Typography, Stack } from "@mui/material";
import Link from "next/link";
import Navbar from "../presentation/components/Navbar";
import SearchBar from "@/presentation/components/SearchBar";
import TattooArtistCard from "@/presentation/components/TattooArtistCard";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Container maxWidth="lg" sx={{marginTop: 5 }}>
        <SearchBar />
        <TattooArtistCard />

        {/* <Typography variant="h3" gutterBottom>
          Tattoo Marketplace
        </Typography> */}
        
        {/* <Stack spacing={2}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            href="/login"
            sx={{ width: "100%" }}
          >
            Login
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            size="large" 
            component={Link} 
            href="/signup"
            sx={{ width: "100%" }}
          >
            Cadastre-se
          </Button>
        </Stack> */}
      </Container>
    </main>
  );
}
