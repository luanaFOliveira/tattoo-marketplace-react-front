'use client';
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { UserDetail } from "@/domain/entities/user";
import { TattooArtist } from "@/domain/entities/tattoo-artist";
import UserForm from "@/presentation/components/UserForm";
import { UpdateTattooArtistUseCase } from "@/application/tattoo-artist/updateTattooArtistUseCase";
import { TattooArtistApi } from "@/infra/api/tattooArtistApi";
import { UpdateUserUseCase } from "@/application/user/updateUserUseCase";
import { UserApi } from "@/infra/api/userApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function EditUserModal({
  user,
  open,
  handleClose,
  userType,
}: {
  user: UserDetail | TattooArtist;
  open: boolean;
  handleClose: () => void;
  userType: "user" | "tattooArtist";
}) {

  const updateTattooArtistUseCase = new UpdateTattooArtistUseCase(new TattooArtistApi());
  const updateUserUseCase = new UpdateUserUseCase(new UserApi());

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <UserForm 
            userType={userType} 
            registerUseCase={userType === "tattooArtist" ? updateTattooArtistUseCase : updateUserUseCase}
            existingUser={user}
        />
        <Button onClick={handleClose}>Fechar</Button>
      </Box>
    </Modal>
  );
}
