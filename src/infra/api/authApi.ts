import { AuthRepository } from "@/domain/repositories/authRepository";
import { User, UserRequest, LoginRequest, LoginResponse } from "@/domain/entities/user";
import { useAuth } from "@/presentation/context/AuthContext";

export class AuthApi implements AuthRepository {

  private loginFn: (user: User) => void;

  constructor(loginFn: (user: User) => void) {
    this.loginFn = loginFn;
  }

  async login(userData:LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao realizar login.");
    }

    const data = await response.json();

    const user: User = { 
        id: data.id, 
        token: data.token, 
        isTattooArtist: data.isTattooArtist,
        profilePicture: data.profilePicture,
        expiresAt: Date.now() + data.expiresIn,
    };
  
    this.loginFn(user);

    return { id: data.id, token: data.token, isTattooArtist: data.isTattooArtist, profilePicture: data.profilePicture };
  }

  async signUp(userData: UserRequest, profileImage: File | null): Promise<{ id: number }> {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(userData)], { type: "application/json" });
    formData.append("request", jsonBlob);
  
    if (profileImage) {
      formData.append("profile_img", profileImage);
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
  
      if (response.status === 400 && contentType?.includes("application/json")) {
        const errorData = await response.json();
  
        throw { type: "validation", errors: errorData };
      }
  
      throw new Error("Erro ao registrar usuário");
    }
  
    const data = await response.json();
    return { id: data.id };
  }
  

// falta implementar o logout
  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
    const { logout } = useAuth();
    logout();
  }
}
