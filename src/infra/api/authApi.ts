import { AuthRepository } from "@/domain/repositories/authRepository";
import { User, UserRequest, LoginRequest, LoginResponse } from "@/domain/entities/user";

export class AuthApi implements AuthRepository {
  async login(userData:LoginRequest): Promise<LoginResponse> {
    const response = await fetch("http://localhost:8089/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return { id: data.id, token: data.token };
  }

  async signUp(userData: UserRequest): Promise<{ id:number }> {
    const response = await fetch("http://localhost:8089/user/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return { id:data.id };
  }
  
// falta implementar o logout
  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
}
