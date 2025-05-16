'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TextField, Button, CircularProgress, Box,Avatar } from "@mui/material";
import MultiSelect from "@/presentation/components/MultiSelect";
import { Category } from "@/domain/entities/category";
import { CategoryApi } from "@/infra/api/categoryApi";
import {  UserDetail, UserRequest } from "@/domain/entities/user";
import { TattooArtist, TattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { useRouter } from 'next/navigation'
import { GetAllCategoriesUseCase } from "@/application/category/getAllCategoriesUseCase";
import { RegisterUseCase } from "@/presentation/adapters/registerUseCaseAdapter";


type UserType = "user" | "tattooArtist";

interface Props<TRequest, TResponse> {
  userType: UserType;
  registerUseCase: RegisterUseCase<TRequest, TResponse>;
  existingUser?: TResponse;
}

interface ValidationError {
  type: "validation";
  errors: Record<string, string>;
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


const getAllCategoriesUseCase = new GetAllCategoriesUseCase(new CategoryApi());


export default function UserForm<TRequest extends UserRequest | TattooArtistRequest, TResponse extends UserDetail | TattooArtist | { id: number }>({
  userType,
  registerUseCase,
  existingUser,
}: Props<TRequest, TResponse>) {

  const [userData, setUserData] = useState<TRequest>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    age: 0,
    location: "",
    ...(userType === "tattooArtist" && { categoryIds: [] }),
  } as TRequest);
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("/image_placeholder.jpg");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    if (userType === "tattooArtist") {
      const fetchCategories = async () => {
        try {
          const data = await getAllCategoriesUseCase.execute();
          setCategories(data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };
      fetchCategories();
    }
  }, [userType]);

  useEffect(() => {
    if (existingUser && "name" in existingUser && "email" in existingUser) {
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
        } as TRequest);
      } else {
        setUserData(baseData as TRequest);
      }
  
      if (existingUser.profilePicture) {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`; 
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
      setUserData((prevUser) => {
        if ('categoryIds' in prevUser) {
          return {
            ...prevUser,
            categoryIds: selectedIds,
          };
        }
        return prevUser;
      });
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
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    if (isNaN(userData.age) || userData.age <= 0) {
      toast.error("Invalid age.");
      setLoading(false);
      return;
    }
  
    try {
      let updatedData = { ...userData };

      if (!userData.password && !userData.passwordConfirm) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, passwordConfirm, ...rest } = updatedData;
        updatedData = rest as TRequest;
      }
  
      if (existingUser) {
        if (!registerUseCase.update) throw new Error("Update method not implemented.");
        const result = await registerUseCase.update(String(existingUser.id), updatedData, profileImage);
        toast.success("User updated successfully.");
        router.push(`/user/${result.id}`);

      } else {
        if (!registerUseCase.create) throw new Error("Create method not implemented.");
        await registerUseCase.create(userData, profileImage);
        toast.success("Registration completed successfully.");
        router.push("/login");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "type" in error &&
        (error as ValidationError).type === "validation"
      ) {
        setFieldErrors((error as ValidationError).errors);
        return;
      }
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
            Choose Profile Picture
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
            <TextField label="Name" variant="outlined" name="name" value={userData.name} onChange={handleChange} fullWidth sx={textFieldStyles} error={Boolean(fieldErrors.name)} helperText={fieldErrors.name}/>
            <TextField label="Email" variant="outlined" name="email" value={userData.email} onChange={handleChange} fullWidth sx={textFieldStyles} error={Boolean(fieldErrors.email)} helperText={fieldErrors.email}/>
          </Box>
  
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField label="Location" variant="outlined" name="location" value={userData.location} onChange={handleChange} fullWidth sx={textFieldStyles} error={Boolean(fieldErrors.location)} helperText={fieldErrors.location}/>
            <TextField label="Age" variant="outlined" name="age" type="number" value={userData.age} onChange={handleChange} fullWidth sx={textFieldStyles} error={Boolean(fieldErrors.age)} helperText={fieldErrors.age}/>
          </Box>
  
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField label="Password" variant="outlined" name="password" type="password" value={userData.password} onChange={handleChange} fullWidth sx={textFieldStyles} error={Boolean(fieldErrors.password)} helperText={fieldErrors.password}/>
            <TextField label="Confirm password" variant="outlined" name="passwordConfirm" type="password" value={userData.passwordConfirm} onChange={handleChange} fullWidth sx={textFieldStyles} />
          </Box>
  
          {userType === "tattooArtist" && (
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <MultiSelect
                items={categories}
                selectedItems={(userData as TattooArtistRequest).categoryIds ?? []}
                onChange={handleCategoryChange}
                label="Categories"
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
            ) : existingUser ? "Save changes" : "Sign Up"}
          </Button>
        </Box>
      </Box>
    </div>
  );
  
}
