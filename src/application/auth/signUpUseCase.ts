import { UserRequest } from "@/domain/entities/user";
import { AuthRepository } from "@/domain/repositories/authRepository";

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: UserRequest, profileImage: File): Promise<{ id:number }> {
    return await this.authRepository.signUp(userData, profileImage);
  }
}
