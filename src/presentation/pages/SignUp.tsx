'use client';
import { useState } from "react";
import { SignUpUseCase } from "@/application/auth/signUpUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { toast } from "react-toastify";
import { Paper, Button, CircularProgress, Box } from "@mui/material";
import { UserRequest} from "@/domain/entities/user";
import UserRegisterForm from "@/presentation/components/UserForm";
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import { useAuth } from "@/presentation/context/AuthContext";  


export default function SignUp() {
    const { login } = useAuth();  
    const signUpUseCase = new SignUpUseCase(new AuthApi(login));

  return (
    <div>
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid  size={{ xs: 12, sm:6 , md: 12 }}>
          <Paper sx={{ gap: 4, padding: 4, boxShadow: 3, borderRadius: 2, height: "35rem", display: "flex", justifyContent: "center" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 250, height: 250 }} />
            <UserRegisterForm userType="user" registerUseCase={signUpUseCase} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
