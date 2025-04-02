'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar } from "@mui/material";
import MultiSelect from "@/presentation/components/MultiSelect";
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import { UserRequest } from "@/domain/entities/user";
import { TattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { useRouter } from 'next/navigation'
import { RegisterTattooArtistUseCase } from "@/application/tattoo-artist/registerTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { SignUpUseCase } from "@/application/auth/signUpUseCase";
import { AuthApi } from "@/infra/api/authApi";
import { useAuth } from "@/presentation/context/AuthContext";  


type UserType = "user" | "tattooArtist";

interface Props {
  initialUserType: UserType;
  initialRegisterUseCase: any;
}


export default function UserRegisterForm({ initialUserType, initialRegisterUseCase }: Props) {
  const [userData, setUserData] = useState<UserRequest | TattooArtistRequest>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
    ...(initialUserType === "tattooArtist" && { categoryIds: [] }),
  });

  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [registerUseCase, setRegisterUseCase] = useState<any>(initialRegisterUseCase);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { login } = useAuth();  
  const registerTattooArtistUseCase = new RegisterTattooArtistUseCase(new TattooArtistApi());
  const signUpUseCase = new SignUpUseCase(new AuthApi(login));

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
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; 
      setProfileImage(file); 
  
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
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
      const { id } = await registerUseCase.execute(userData, profileImage);
      console.log(`${userType} cadastrado:`, id);
      toast.success("Cadastro realizado com sucesso.");
      router.push("/login");
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

        <FormControl>
          <FormLabel>Você é um tatuador?</FormLabel>
          <RadioGroup
            row
            value={userType}
            onChange={(e) => {
              const selectedType = e.target.value as UserType;
              setUserType(selectedType);
              setRegisterUseCase(selectedType === "tattooArtist" ? registerTattooArtistUseCase : signUpUseCase);
            }}
          >
            <FormControlLabel value="user" control={<Radio />} label="Não" />
            <FormControlLabel value="tattooArtist" control={<Radio />} label="Sim" />
          </RadioGroup>
        </FormControl>

        {userType === "tattooArtist" && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <MultiSelect
              items={categories}
              selectedItems={(userData as TattooArtistRequest).categoryIds ?? []}
              onChange={handleCategoryChange}
              label="Categorias"
            />
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Button variant="contained" component="label">
            Escolher Imagem de Perfil
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        {/* <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button> */}
        {imagePreview && (
            <Avatar
            src={imagePreview}
            sx={{ width: 80, height: 80, border: "2px solid gray" }}
            />
        )}
        </Box>


        <Button onClick={handleSignUp} variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Cadastrar"}
        </Button>
      </Box>
    </div>
  );
}
