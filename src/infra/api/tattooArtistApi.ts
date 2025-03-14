import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";
import { TattooArtist } from "@/domain/entities/tattoo-artist";

export class TattooArtistApi implements TattooArtistRepository {

    async getTattooArtist(id: string): Promise<TattooArtist> {
        const response = await fetch(`http://localhost:8089/public/tattoo-artist/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return this.mapToTattooArtist(data);
    }
    
    async getAllTattooArtists(): Promise<TattooArtist[]> {
        const response = await fetch(`http://localhost:8089/public/tattoo-artist`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return data.map((artist: any) => this.mapToTattooArtist(artist));
    }

  private mapToTattooArtist(data: any): TattooArtist {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      location: data.location,
      age: data.age,
      rate: data.rate,
      categories: data.categories,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

}
