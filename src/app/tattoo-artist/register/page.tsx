import { Container, Box, Typography, Paper } from "@mui/material";
import TattooArtistRegister from "@/presentation/pages/TattooArtistRegister";

export default function RegisterTattooArtistPage() {
  return (
    <main>
      <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Paper sx={{ width: "100%", padding: 4, boxShadow: 3, borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Criar Tattoo Artist
            </Typography>
          </Box>
          <TattooArtistRegister />
        </Paper>
      </Container>
    </main>
  );
}
