'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, CardMedia, Box, Button } from "@mui/material";
import { useAuth } from "@/presentation/context/AuthContext";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { UserDetail } from "@/domain/entities/user";
import { UserApi } from "@/infra/api/userApi";

export default function UserView({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  //const { user, isAuthenticated } = useAuth(); 
  //const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = new UserApi();
        const data = await api.getUser(userId);
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar tatuador:", error);
        toast.error("Erro ao buscar tatuador");
      } finally {
        setLoading(false);
       
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!user) {
    return <Typography variant="h6" color="error">Usuario não encontrado</Typography>;
  }


  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 5 }}>
      <Card sx={{ display: "flex", border: "2px solid #6A0DAD", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={`http://localhost:8089${user.profilePicture}`}
        alt={user.name}
        sx={{ width: 300, height: "100%", objectFit: "cover", borderRadius: "5px 0 0 5px" }}
      />
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: 3 }}>
          <Typography variant="h4" color="black" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="h4" color="black" fontWeight="bold">
            Email: {user.email}
          </Typography>
          <Typography variant="h4" color="black" fontWeight="bold">
            Idade: {user.age}
          </Typography>
          <Typography variant="body1" color="black" sx={{ mt: 1 }}>
            📍 {user.location}
          </Typography>
        </CardContent>
        {/* <Button variant="contained" color="primary" onClick={handleQuoteRequest}>
          Solicitar Orçamento
        </Button> */}
      </Card>
    </Box>
  );
}
