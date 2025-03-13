'use client';
import { useState } from "react";
import { LoginUseCase } from "@/application/auth/loginUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box } from "@mui/material";

const loginUseCase = new LoginUseCase(new AuthApi());

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { id, token } = await loginUseCase.execute(email, password);
      console.log("Usuário logado:", id);
      localStorage.setItem("token", token);
      toast.success("Login realizado com sucesso.");
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
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
    </div>
  );
}
