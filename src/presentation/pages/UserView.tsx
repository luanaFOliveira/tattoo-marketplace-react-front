'use client';
import React, { useEffect, useState } from "react";
import { CircularProgress,Divider, Typography, Avatar, Chip,  Box } from "@mui/material";
import { useAuth } from "@/presentation/context/AuthContext";
import { toast } from "react-toastify";
import { UserDetail } from "@/domain/entities/user";
import { UserApi } from "@/infra/api/userApi";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QuoteList from '@/presentation/pages/QuoteList';
import EditUserModal from "@/presentation/components/EditUserModal";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { GetTattooArtistUseCase } from "@/application/tattoo-artist/getTattooArtistUseCase";
import { GetUserUseCase } from "@/application/user/getUserUseCase";
import TattooArtistTab from "@/presentation/components/TattooArtistTab";
import GradeIcon from '@mui/icons-material/Grade';
import { useRouter } from 'next/navigation'


const getTattooArtistUseCase = new GetTattooArtistUseCase(new TattooArtistApi());
const getUserUseCase = new GetUserUseCase(new UserApi());

export default function UserView({ userId }: { userId: string }) {
  const [userData, setUserData] = useState< UserDetail | TattooArtist |null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { user} = useAuth(); 
  const router = useRouter();
 
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    router.refresh();
  };

  useEffect(() => {
    if (!user) return; 
    setLoading(true);
    const fetchUser = async () => {
      try {
        if (user.isTattooArtist) {
          const data = await getTattooArtistUseCase.execute(userId);
          setUserData(data);
        } else {
          const data = await getUserUseCase.execute(userId);
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [userId, user]); 
  

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 10 }} />;
  }

  if (!userData) {
    return <Typography variant="h6" color="error">User not found</Typography>;
  }

  if (!user) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 10 }} />;
  }


  return (<>
   <Box sx={{ width: "100%", px: 2, mt: 10 }}>
      <Box 
        sx={{ 
          position: "relative", 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar 
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${userData.profilePicture}`} 
          alt={userData.name}
          sx={{ width: 150, height: 150 }}
        />

        <Box>
          <Typography variant="h4" color="white" fontWeight="bold">
            {userData.name}
          </Typography>
          <Typography variant="body1" color="white" sx={{ mt: 1 }}>
            <LocationOnIcon/> {userData.location}
          </Typography>
          <Typography variant="body1" color="white">
            <EmailIcon/> {userData.email}
          </Typography>
          {"rate" in userData ? (
            <Typography variant="body1" color="white">
              <GradeIcon /> {userData.rate ?? "Not rated yet"}
            </Typography>
          ) : null}

          {user?.isTattooArtist && "categories" in userData && userData.categories && (
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {userData.categories.map((category, index) => (
                <Chip
                  key={index}
                  label={`${category.name}`}
                  color="primary"
                  variant="filled"
                />
              ))}
            </Box>
          )}
        </Box>

        <Fab
          color="primary"
          aria-label="edit"
          variant="extended"
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={handleOpenModal} 
        >
          <EditIcon sx={{ mr: 1 }} /> Edit
        </Fab>
      </Box>

      <Divider sx={{ my: 4, color: "white", borderColor: "white", fontWeight: "bold" }}>
      </Divider>

      {user?.isTattooArtist && "images" in userData ? (
        <TattooArtistTab images={userData.images} userId={userData.id} />
      ) : (
        <QuoteList />
      )}
      <EditUserModal
        user={userData}
        open={openModal}
        handleClose={handleCloseModal}
        userType={user?.isTattooArtist ? "tattooArtist" : "user"}
      />
    </Box>
    
    </>);
  
  
}
