'use client';
import { useState } from "react";
import { LoginUseCase } from "@/application/auth/loginUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { LoginRequest, LoginResponse } from "@/domain/entities/user";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/presentation/context/AuthContext";  
import { Container, Typography, Paper } from "@mui/material";

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const { login } = useAuth();  
  const loginUseCase = new LoginUseCase(new AuthApi(login));

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response: LoginResponse = await loginUseCase.execute(credentials);
      console.log("Usuário logado:", response.id);
      toast.success("Login realizado com sucesso.");
      router.push("/");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Paper sx={{ width: "100%", padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: (theme) => theme.palette.secondary.main }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" color="primary">
            BEM VINDO
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            sx={{
              input: { color: 'white' }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
            }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            sx={{
              input: { color: 'white' }, 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
            }}
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>

    </div>
  );
}
