import { TattooArtist, RateTattooArtistRequest } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class RateTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(id:string, data: RateTattooArtistRequest): Promise<TattooArtist> {
    return await this.tattooArtistRepository.rateTattooArtist(id,data);
  }
}
