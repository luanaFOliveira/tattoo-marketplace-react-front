import { TattooArtist, TattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class RegisterTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(data: TattooArtistRequest, profilePicture: File): Promise<{ id:number }> {
    return await this.tattooArtistRepository.registerTattooArtist(data, profilePicture);
  }
}
