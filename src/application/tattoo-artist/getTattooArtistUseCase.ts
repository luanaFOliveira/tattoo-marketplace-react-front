import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class GetTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(id: string): Promise<TattooArtist> {
    return await this.tattooArtistRepository.getTattooArtist(id);
  }
}
