import React from "react";
import { Box, Typography } from "@mui/material";

type BaseHomePageProps = {
  content: React.ReactNode;
};

export default function BaseHomePage({ content }: BaseHomePageProps) {
  return (
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
          height: "100%",
          backgroundImage: 'url("/sign-up-page-illustration.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "top center", 
        }}
      />

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
        <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
          Welcome to Ink Connection!
        </Typography>

        {content}
      </Box>
    </Box>
  );
}
