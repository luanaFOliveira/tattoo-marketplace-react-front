'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar } from "@mui/material";
import MultiSelect from "@/presentation/components/MultiSelect";
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import { UpdateUserRequest, UserDetail, UserRequest } from "@/domain/entities/user";
import { TattooArtist, TattooArtistRequest, UpdateTattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { useRouter } from 'next/navigation'
import { GetAllCategoriesUseCase } from "@/application/category/getAllCategoriesUseCase";


type UserType = "user" | "tattooArtist";

interface Props {
  userType: UserType;
  registerUseCase: any;
  existingUser?: UserDetail | TattooArtist;
}

const textFieldStyles = {
  input: {
    color: '#eaeaea',
    backgroundColor: '#1e1e1e',
  },
  label: {
    color: '#aaaaaa',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#444444',
    },
    '&:hover fieldset': {
      borderColor: '#666666',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9932cc',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#9932cc',
  },
};

const multiSelectStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#1e1e1e',
    color: '#eaeaea',
    '& fieldset': {
      borderColor: '#444444',
    },
    '&:hover fieldset': {
      borderColor: '#666666',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9932cc',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#aaaaaa',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#9932cc',
  },
  '& .MuiSvgIcon-root': {
    color: '#eaeaea', // ícone da seta (dropdown)
  },
};



export default function UserRegisterForm({ userType, registerUseCase, existingUser }: Props) {
  const [userData, setUserData] = useState<UserRequest | TattooArtistRequest>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
    ...(userType === "tattooArtist" && { categoryIds: [] }),
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("/image_placeholder.jpg");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(new CategoryApi());
  

  useEffect(() => {
    if (userType === "tattooArtist") {
      const fetchCategories = async () => {
        try {
          const data = await getAllCategoriesUseCase.execute();
          setCategories(data);
        } catch (error) {
          console.error("Erro ao buscar categorias:", error);
        }
      };
      fetchCategories();
    }
  }, [userType]);

  useEffect(() => {
    if (existingUser) {
      const baseData = {
        name: existingUser.name,
        email: existingUser.email,
        password: "", 
        passwordConfirm: "",
        age: existingUser.age,
        location: existingUser.location,
      };
  
      if (userType === "tattooArtist") {
        setUserData({
          ...baseData,
          categoryIds: (existingUser as TattooArtist).categories?.map(c => c.id) ?? [],
        } as TattooArtistRequest);
      } else {
        setUserData(baseData as UserRequest);
      }
  
      if (existingUser.profilePicture) {
        const baseUrl = "http://localhost:8089"; 
        setImagePreview(`${baseUrl}${existingUser.profilePicture}`);
      }
    }
  }, [existingUser, userType]);
  

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
  
    if (!existingUser && userData.password !== userData.passwordConfirm) {
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
      let id;
  
      if (existingUser) {
        const result = await registerUseCase.execute(existingUser.id,userData, profileImage);
        toast.success("Usuário atualizado com sucesso.");
        router.push(`/user/${result.id}`);
      } else {
        const result = await registerUseCase.execute(userData, profileImage);
        id = result.id;
        toast.success("Cadastro realizado com sucesso.");
        router.push("/login");
      }
  
    } catch (error) {
      console.error("Erro:", error);
      toast.error(existingUser ? "Erro ao atualizar usuário." : "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#2e2e2e",
          padding: 3,
          borderRadius: 2,
          height: "100%", 
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRight: "1px solid gray", 
            paddingRight: 2,
          }}
        >
          {imagePreview && (
            <Avatar src={imagePreview} sx={{ width: 150, height: 150, border: "2px solid gray" }} />
          )}
          <Button variant="contained" component="label">
            Escolher Foto de Perfil
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
  
         
        </Box>
  
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            paddingLeft: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField label="Nome" variant="outlined" name="name" value={userData.name} onChange={handleChange} fullWidth sx={textFieldStyles} />
            <TextField label="Email" variant="outlined" name="email" value={userData.email} onChange={handleChange} fullWidth sx={textFieldStyles}/>
          </Box>
  
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField label="Localização" variant="outlined" name="location" value={userData.location} onChange={handleChange} fullWidth sx={textFieldStyles}/>
            <TextField label="Idade" variant="outlined" name="age" type="number" value={userData.age} onChange={handleChange} fullWidth sx={textFieldStyles}/>
          </Box>
  
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField label="Senha" variant="outlined" name="password" type="password" value={userData.password} onChange={handleChange} fullWidth sx={textFieldStyles}/>
            <TextField label="Confirme a senha" variant="outlined" name="passwordConfirm" type="password" value={userData.passwordConfirm} onChange={handleChange} fullWidth sx={textFieldStyles}/>
          </Box>
  
          {userType === "tattooArtist" && (
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <MultiSelect
                items={categories}
                selectedItems={(userData as TattooArtistRequest).categoryIds ?? []}
                onChange={handleCategoryChange}
                label="Categorias"
                //sx={multiSelectStyles}
                />
            </Box>
          )}
  
          <Button
            onClick={handleSignUp}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : existingUser ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </Box>
      </Box>
    </div>
  );
  
}
