'use client';
import React, { useEffect, useState } from "react";
import { RegisterTattooArtistUseCase } from "@/application/tattoo-artist/registerTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { toast } from "react-toastify";
import { Paper, Button, CircularProgress, Box } from "@mui/material";
import { TattooArtistRequest } from "@/domain/entities/tattoo-artist";
import MultiSelect from "@/presentation/components/MultiSelect"; 
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import UserRegisterForm from "@/presentation/components/UserForm";
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';

const registerTattooArtistUseCase = new RegisterTattooArtistUseCase(new TattooArtistApi());
export default function TattooArtistRegister() {
  return (
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
            <UserRegisterForm initialUserType="tattooArtist" initialRegisterUseCase={registerTattooArtistUseCase} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );  
}
// export default function TattooArtistRegister() {
//   const [tattooArtist, setTattooArtist] = useState<TattooArtistRequest>({
//     name: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     age: 0,
//     location: "",
//     categoryIds: [],
//   });

//   const [images, setImages] = useState<File[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [categories, setCategories] = useState<Category[]>([]);
//   useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const api = new CategoryApi();
//           const data = await api.getAllCategories();
//           setCategories(data);
//         } catch (error) {
//           console.error("Erro ao buscar categorias:", error);
//         } finally {
//         }
//       };
//       fetchCategories();
//   }, []);


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setTattooArtist((prevTattoo) => ({
//       ...prevTattoo,
//       [name]: name === "age" || name === "rate" ? Number(value) : value,
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImages(Array.from(e.target.files));
//     }
//   };

//   const handleCategoryChange = (selectedIds: number[]) => {
//     setTattooArtist((prevTattoo) => ({
//       ...prevTattoo,
//       categoryIds: selectedIds,
//     }));
//   };

//   const handleSignUp = async () => {
//     setLoading(true);

//     if (tattooArtist.password !== tattooArtist.passwordConfirm) {
//       toast.error("As senhas não coincidem.");
//       setLoading(false);
//       return;
//     }

//     if (isNaN(tattooArtist.age) || tattooArtist.age <= 0) {
//       toast.error("Idade inválida.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { id } = await registerTattooArtistUseCase.execute(tattooArtist, images);
//       console.log("Tatuador cadastrado:", id);
//       toast.success("Cadastro realizado com sucesso.");
//     } catch (error) {
//       console.error("Erro no cadastro:", error);
//       toast.error("Erro ao cadastrar tatuador.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
//         <TextField label="Nome" variant="outlined" name="name" value={tattooArtist.name} onChange={handleChange} fullWidth />
//         <TextField label="Email" variant="outlined" name="email" value={tattooArtist.email} onChange={handleChange} fullWidth />
//         <TextField label="Localização" variant="outlined" name="location" value={tattooArtist.location} onChange={handleChange} fullWidth />
//       </Box>
//       <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
//         <TextField label="Senha" variant="outlined" name="password" type="password" value={tattooArtist.password} onChange={handleChange} fullWidth />
//         <TextField label="Confirme a senha" variant="outlined" name="passwordConfirm" type="password" value={tattooArtist.passwordConfirm} onChange={handleChange} fullWidth />
//         <TextField label="Idade" variant="outlined" name="age" type="number" value={tattooArtist.age} onChange={handleChange} fullWidth />
//       </Box>
//       <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>  

//         <MultiSelect
//           items={categories}
//           selectedItems={tattooArtist.categoryIds}
//           onChange={handleCategoryChange}
//           label="Categorias"
//         />

//         {/* <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ marginBottom: "16px" }} /> */}

//         <Button onClick={handleSignUp} variant="contained" color="primary" fullWidth disabled={loading}>
//           {loading ? <CircularProgress size={24} /> : "Cadastrar"}
//         </Button>
//       </Box>
//     </div>
//   );
// }
