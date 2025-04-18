'use client';

import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import Fab from '@mui/material/Fab';
import UserForm from "@/presentation/components/UserForm";
import { SignUpUseCase } from "@/application/auth/signUpUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { RegisterTattooArtistUseCase } from "@/application/tattoo-artist/registerTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { useAuth } from "@/presentation/context/AuthContext"; 

const FadeText = () => {
  const [visible, setVisible] = useState(false);
  const [userType, setUserType] = useState<"user" | "tattooArtist" | null>(null);
  const { login } = useAuth();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 300); 
    return () => clearTimeout(timeout); 
  }, []);

  const handleUserTypeSelection = (type: "user" | "tattooArtist") => {
    setUserType(type);
  };

  const registerTattooArtistUseCase = new RegisterTattooArtistUseCase(new TattooArtistApi());
  const signUpUseCase = new SignUpUseCase(new AuthApi(login));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Fade in={visible} timeout={1000}>
        <Typography variant="h4" color="primary">
          Welcome to Ink Connection!
        </Typography>
      </Fade>

      <Fade in={visible} timeout={1000} style={{ transitionDelay: '1.5s' }}>
        <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
          Are you a Tattoo Artist?
        </Typography>
      </Fade>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 2 }}>
        <Fab
          variant="extended"
          sx={{ 
            backgroundColor: (theme) => theme.palette.secondary.main, 
            color: (theme) => theme.palette.primary.main,             
            "&:hover": { backgroundColor: (theme) => theme.palette.secondary.dark } 
          }}
          onClick={() => handleUserTypeSelection("user")}
        >
          <SelfImprovementIcon sx={{ mr: 1 }} />
          Normal User
        </Fab>

        <Fab
          variant="extended"
          sx={{ 
            backgroundColor: (theme) => theme.palette.secondary.main,  
            color: (theme) => theme.palette.primary.main,              
            "&:hover": { backgroundColor: (theme) => theme.palette.secondary.dark } 
          }}
          onClick={() => handleUserTypeSelection("tattooArtist")}
        >
          <SportsMartialArtsIcon sx={{ mr: 1 }} />
          Tattoo Artist
        </Fab>
      </Box>

      {userType && (
        <Fade in={!!userType} timeout={1000}>
          <Box sx={{ marginTop: 2, width: "100%", maxWidth: 800 }}>
            <UserForm 
              userType={userType} 
              registerUseCase={userType === "tattooArtist" ? registerTattooArtistUseCase : signUpUseCase}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default function SignUp() {
  return (
    <div>
      <FadeText />
    </div>
  );
}
