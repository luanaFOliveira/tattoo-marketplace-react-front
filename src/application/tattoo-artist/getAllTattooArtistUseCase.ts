import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class GetAllTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(): Promise<TattooArtist[]> {
    return await this.tattooArtistRepository.getAllTattooArtists();
  }
}
