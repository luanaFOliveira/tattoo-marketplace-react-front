import React from "react";
import { Box, Typography } from "@mui/material";

type AuthLayoutProps = {
  content: React.ReactNode;
};

export default function AuthLayout({ content }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        overflow: "hidden",
        marginTop: 8,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: "85%",
          backgroundImage: 'url("/sign-up-illustration.png")',
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
