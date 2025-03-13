import { AuthRepository } from "@/domain/repositories/authRepository";
import { User } from "@/domain/entities/user";

export class AuthApi implements AuthRepository {
  async login(email: string, password: string): Promise<{ id:number; token: string }> {
    const response = await fetch("http://localhost:8089/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return { id: data.id, token: data.token };
  }

  async signUp(name: string, email: string, password: string, passwordConfirm: string, location: string, age: number ): Promise<{ id:number }> {
    const response = await fetch("http://localhost:8089/user/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, passwordConfirm, location, age }),
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
