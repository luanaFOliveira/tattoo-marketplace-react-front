import { Button, Container, Typography, Stack } from "@mui/material";
import Link from "next/link";
import Navbar from "../presentation/components/Navbar";
import SearchBar from "@/presentation/components/SearchBar";
import TattooArtistList from "@/presentation/pages/TattooArtistList";

export default function Home() {
  return (
    <main>
      <Container maxWidth="xl" sx={{marginTop: 5 }}>
        <Stack spacing={4}>  
          <SearchBar />
          <TattooArtistList />
        </Stack>
      </Container>
    </main>
  );
}
