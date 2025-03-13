import { AuthRepository } from "@/domain/repositories/authRepository";

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    return await this.authRepository.logout();
  }
}
