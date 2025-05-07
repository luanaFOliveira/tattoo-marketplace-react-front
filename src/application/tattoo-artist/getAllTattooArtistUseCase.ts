import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class GetAllTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(filters: { category?: string, location?: string, name?:string, sortBy?: string, sortOrder?: string }): Promise<TattooArtist[]> {
    return await this.tattooArtistRepository.getAllTattooArtists(filters);
  }
}
