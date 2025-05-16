import { Box, Typography } from "@mui/material";
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
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", 
            textAlign: "center",
            p: 4,
            pt: 0, 
        }}
      >
        <Typography variant="h4" color="primary" align="center" sx={{ mt: -10, mb: 6 }}>  
            Find The Perfect Tattoo Artist For Your Next Piece
        </Typography>
        <Typography variant="h6" color="primary" align="center" sx={{ mb: 6 }}>
            Search by name, category or location
        </Typography>
        <HomePage />
        
      </Box>
      <Box
        sx={{
          width: { xs: "70%", md: "50%" },
          height: "70%",
          backgroundImage: 'url("/home-illustration.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center", 
          marginTop: 10,
        }}
      />

    </Box>
    </main>
  );
}
