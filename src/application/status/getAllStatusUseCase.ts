import { Status } from "@/domain/entities/status";
import { StatusRepository } from "@/domain/repositories/statusRepository";

export class GetAllStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  async execute(): Promise<Status[]> {
    return await this.statusRepository.getAllStatus();
  }
}
