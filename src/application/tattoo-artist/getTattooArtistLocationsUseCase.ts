import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class GetTattooArtistLocationsUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(): Promise<string[]> {
    return await this.tattooArtistRepository.getTattooArtistLocations();
  }
}
