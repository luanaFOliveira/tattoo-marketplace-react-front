'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import MultiSelect from "@/presentation/components/MultiSelect";
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import { UserRequest} from "@/domain/entities/user";
import { TattooArtistRequest } from "@/domain/entities/tattoo-artist";

type UserType = "user" | "tattooArtist";

interface Props {
  userType: UserType;
  registerUseCase: any;
}

export default function UserRegisterForm({ userType, registerUseCase }: Props) {
  const [userData, setUserData] = useState<UserRequest | TattooArtistRequest>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
    ...(userType === "tattooArtist" && { categoryIds: [] }), 
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (userType === "tattooArtist") {
      const fetchCategories = async () => {
        try {
          const api = new CategoryApi();
          const data = await api.getAllCategories();
          setCategories(data);
        } catch (error) {
          console.error("Erro ao buscar categorias:", error);
        }
      };
      fetchCategories();
    }
  }, [userType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (selectedIds: number[]) => {
    if (userType === "tattooArtist") {
      setUserData((prevUser) => ({
        ...prevUser,
        categoryIds: selectedIds,
      }) as TattooArtistRequest);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSignUp = async () => {
    setLoading(true);

    if (userData.password !== userData.passwordConfirm) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (isNaN(userData.age) || userData.age <= 0) {
      toast.error("Idade inválida.");
      setLoading(false);
      return;
    }

    try {
      const payload = userType === "tattooArtist" ? { ...userData, images } : userData;
      const { id } = await registerUseCase.execute(payload);
      console.log(`${userType} cadastrado:`, id);
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField label="Nome" variant="outlined" name="name" value={userData.name} onChange={handleChange} fullWidth />
        <TextField label="Email" variant="outlined" name="email" value={userData.email} onChange={handleChange} fullWidth />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField label="Localização" variant="outlined" name="location" value={userData.location} onChange={handleChange} fullWidth />
        <TextField label="Idade" variant="outlined" name="age" type="number" value={userData.age} onChange={handleChange} fullWidth />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField label="Senha" variant="outlined" name="password" type="password" value={userData.password} onChange={handleChange} fullWidth />
        <TextField label="Confirme a senha" variant="outlined" name="passwordConfirm" type="password" value={userData.passwordConfirm} onChange={handleChange} fullWidth />
      </Box>

      {userType === "tattooArtist" && (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <MultiSelect items={categories} selectedItems={(userData as TattooArtistRequest).categoryIds} onChange={handleCategoryChange} label="Categorias" />
          {/* <input type="file" multiple accept="image/*" onChange={handleImageChange} /> */}
        </Box>
      )}

      <Button onClick={handleSignUp} variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Cadastrar"}
      </Button>
    </Box>
    </div>
  );
}
