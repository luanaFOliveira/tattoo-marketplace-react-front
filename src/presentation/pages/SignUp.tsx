 'use client';
// import { useState } from "react";
// import { SignUpUseCase } from "@/application/auth/signUpUseCase";
// import { AuthApi } from "@/infra/api/authApi";
// import { toast } from "react-toastify";
// import { Paper, Button, CircularProgress, Box, Typography } from "@mui/material";
// import { UserRequest} from "@/domain/entities/user";
// import UserRegisterForm from "@/presentation/components/UserForm";
// import Grid from '@mui/material/Grid2';
// import Avatar from '@mui/material/Avatar';
// import { useAuth } from "@/presentation/context/AuthContext";  


// export default function SignUp() {
//     const { login } = useAuth();  
//     const signUpUseCase = new SignUpUseCase(new AuthApi(login));

//   return (
//     <div>
//       <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Grid container spacing={4} justifyContent="center" alignItems="center">
//         <Grid  size={{ xs: 12, sm:6 , md: 12 }}>
//           <Paper sx={{ gap: 4, padding: 4, boxShadow: 3, borderRadius: 2, height: "35rem", display: "flex", justifyContent: "center" }}>
//             <UserRegisterForm initialUserType="user" initialRegisterUseCase={signUpUseCase} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const FadeText = () => {
  const [visible, setVisible] = useState(false);
  const welcomeText = "Welcome to Ink Connection!";
  const questionText = "Are you a Tattoo Artist?";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 300); 

    return () => clearTimeout(timeout); 
  }, []);

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
          {welcomeText}
        </Typography>
      </Fade>

      <Fade in={visible} timeout={1000} style={{ transitionDelay: '1.5s' }}>
        <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
          {questionText}
        </Typography>
      </Fade>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
        {/* <Button
            variant="contained" 
            startIcon={<SelfImprovementIcon  />} 
            sx={{
            padding: "10px", 
            fontSize: "16px", 
            backgroundColor: "secondary", 
            color: "purple", 
            "&:hover": {
                backgroundColor: "#8E8E8E",
            },
            }}
        >
            Normal User
        </Button> */}
        <IconButton aria-label="user" color="primary" size="large">
            <SelfImprovementIcon fontSize="inherit" />
        </IconButton>

        <Button
            variant="contained" 
            startIcon={<SportsMartialArtsIcon sx={{ fontSize: 60 }} />} 
            sx={{
            flexDirection: "column", 
            padding: "20px", 
            fontSize: "16px", 
            backgroundColor: "secondary", 
            color:(theme) => theme.palette.primary.main, 
            "&:hover": {
                backgroundColor: "#8E8E8E",
            },
            }}
        >
            Tattoo Artist
        </Button>
        </Box>
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

