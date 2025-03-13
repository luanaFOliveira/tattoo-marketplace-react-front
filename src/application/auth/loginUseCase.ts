import { AuthRepository } from "@/domain/repositories/authRepository";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<{ id: number; token: string }> {
    return await this.authRepository.login(email, password);
  }
}
