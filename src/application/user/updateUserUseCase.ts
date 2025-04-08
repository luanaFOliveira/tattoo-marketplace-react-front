import { UserDetail, UpdateUserRequest } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id:string, data: UpdateUserRequest, profilePicture: File): Promise<UserDetail> {
    return await this.userRepository.updateUser(id,data, profilePicture);
  }
}
