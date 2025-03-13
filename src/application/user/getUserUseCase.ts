import { UserDetail } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserDetail> {
    return await this.userRepository.getUser(id);
  }
}
