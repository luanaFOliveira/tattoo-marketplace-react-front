'use client';
import { useState } from "react";
import { RegisterTattooArtistUseCase } from "@/application/tattoo-artist/registerTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { TattooArtistRequest } from "@/domain/entities/tattoo-artist";

const registerTattooArtistUseCase = new RegisterTattooArtistUseCase(new TattooArtistApi());

export default function TattooArtistRegister() {
  const [tattooArtist, setTattooArtist] = useState<TattooArtistRequest>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
    rate: 0,
    categoryIds: [],
  });

  const [images, setImages] = useState<File[]>([]); // Para armazenar as imagens
  const [loading, setLoading] = useState(false);
  const [categoryIdInput, setCategoryIdInput] = useState(""); // Para o input de categoryId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTattooArtist((prevTattoo) => ({
      ...prevTattoo,
      [name]: name === "age" || name === "rate" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Atualiza o estado com as imagens selecionadas
    }
  };

  const handleCategoryAdd = () => {
    if (categoryIdInput && !isNaN(Number(categoryIdInput))) {
      setTattooArtist((prevTattoo) => ({
        ...prevTattoo,
        categoryIds: [...prevTattoo.categoryIds, Number(categoryIdInput)],
      }));
      setCategoryIdInput(""); // Limpa o campo de entrada
    } else {
      toast.error("ID da categoria inválido.");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);

    if (tattooArtist.password !== tattooArtist.passwordConfirm) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (isNaN(tattooArtist.age) || tattooArtist.age <= 0) {
      toast.error("Idade inválida.");
      setLoading(false);
      return;
    }

    try {
      const { id } = await registerTattooArtistUseCase.execute(tattooArtist, images);
      console.log("Tatuador cadastrado:", id);
      toast.success("Cadastro realizado com sucesso.");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar tatuador.");
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
          value={tattooArtist.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={tattooArtist.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Senha"
          variant="outlined"
          name="password"
          type="password"
          value={tattooArtist.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirme a senha"
          variant="outlined"
          name="passwordConfirm"
          type="password"
          value={tattooArtist.passwordConfirm}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Localização"
          variant="outlined"
          name="location"
          value={tattooArtist.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Idade"
          variant="outlined"
          name="age"
          type="number"
          value={tattooArtist.age}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Rate"
          variant="outlined"
          name="rate"
          type="number"
          value={tattooArtist.rate}
          onChange={handleChange}
          fullWidth
        />
        
        {/* Campo para adicionar categorias */}
        <TextField
          label="Adicionar Categoria ID"
          variant="outlined"
          value={categoryIdInput}
          onChange={(e) => setCategoryIdInput(e.target.value)}
          fullWidth
        />
        <Button onClick={handleCategoryAdd} variant="outlined" fullWidth>
          Adicionar Categoria
        </Button>

        <Box>
          <strong>Categorias Selecionadas:</strong>
          <ul>
            {tattooArtist.categoryIds.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        </Box>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "16px" }}
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
