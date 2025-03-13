'use client';
import { useState } from "react";
import { SignUpUseCase } from "@/application/auth/signUpUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box } from "@mui/material";

const signUpUseCase = new SignUpUseCase(new AuthApi());

interface UserRequest {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: number;
  location: string;
}

export default function SignUpForm() {
  const [user, setUser] = useState<UserRequest>({
    id: 0,
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSignUp = async () => {
    setLoading(true);

    if (user.password !== user.passwordConfirm) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (isNaN(user.age) || user.age <= 0) {
      toast.error("Idade inválida.");
      setLoading(false);
      return;
    }

    try {
      const { id } = await signUpUseCase.execute(
        user.name,
        user.email,
        user.password,
        user.passwordConfirm,
        user.location,
        user.age
      );
      console.log("Usuário cadastrado:", id);
      toast.success("Cadastro realizado com sucesso.");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome"
          variant="outlined"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Senha"
          variant="outlined"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirme a senha"
          variant="outlined"
          name="passwordConfirm"
          type="password"
          value={user.passwordConfirm}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Localização"
          variant="outlined"
          name="location"
          value={user.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Idade"
          variant="outlined"
          name="age"
          type="number"
          value={user.age}
          onChange={handleChange}
          fullWidth
        />
        <Button
          onClick={handleSignUp}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Cadastrar"}
        </Button>
      </Box>
    </div>
  );
}
