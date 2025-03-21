import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";
import { TattooArtist, TattooArtistRequest } from "@/domain/entities/tattoo-artist";

export class TattooArtistApi implements TattooArtistRepository {

    async getTattooArtist(id: string): Promise<TattooArtist> {
        const response = await fetch(`http://localhost:8089/tattoo-artist/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return this.mapToTattooArtist(data);
    }
    
    async getAllTattooArtists(): Promise<TattooArtist[]> {
        const response = await fetch(`http://localhost:8089/tattoo-artist`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return data.map((artist: any) => this.mapToTattooArtist(artist));
    }

    async registerTattooArtist(data: TattooArtistRequest, images: File[] = []): Promise<{ id:number }> {
      const formData = new FormData();
  
      formData.append("request", JSON.parse(JSON.stringify(data)));
  
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
  
      const response = await fetch(`http://localhost:8089/tattoo-artist/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Erro ao registrar tatuador');
      }
  
      const responseData = await response.json();
  
      return { id:responseData.id };
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
