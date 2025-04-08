import { TattooArtist, UpdateTattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class UpdateTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(id:string, data: UpdateTattooArtistRequest, profilePicture: File): Promise<TattooArtist> {
    return await this.tattooArtistRepository.updateTattooArtist(id,data, profilePicture);
  }
}
