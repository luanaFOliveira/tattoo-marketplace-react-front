import { LoginRequest, LoginResponse } from "@/domain/entities/user";
import { AuthRepository } from "@/domain/repositories/authRepository";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: LoginRequest): Promise<LoginResponse> {
    return await this.authRepository.login(userData);
  }
}
