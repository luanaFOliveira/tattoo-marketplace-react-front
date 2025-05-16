import { TattooArtist } from "@/domain/entities/tattoo-artist";
import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";

export class AddPortifolioImagesUseCase {
  constructor(private tattooArtistRepository: TattooArtistRepository) {}

  async execute(id:string, images: File[]): Promise<TattooArtist> {
    return await this.tattooArtistRepository.addPortifolioImages(id,images);
  }
}
