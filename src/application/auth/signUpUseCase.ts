import { AuthRepository } from "@/domain/repositories/authRepository";

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(name: string, email: string, password: string, passwordConfirm: string, location: string, age: number): Promise<{ id:number }> {
    return await this.authRepository.signUp(name, email, password, passwordConfirm, location, age);
  }
}
