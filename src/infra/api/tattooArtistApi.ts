import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";
import { TattooArtist, TattooArtistRequest, UpdateTattooArtistRequest } from "@/domain/entities/tattoo-artist";

export class TattooArtistApi implements TattooArtistRepository {

    async getTattooArtist(id: string): Promise<TattooArtist> {
        const response = await fetch(`http://localhost:8089/tattoo-artist/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        return this.mapToTattooArtist(data);
    }
    
    async getAllTattooArtists(filters: { category?: string, location?: string, sortBy?: string, sortOrder?: string }): Promise<TattooArtist[]> {
      const { category, location, sortBy, sortOrder } = filters;

      const url = new URL("http://localhost:8089/tattoo-artist");

      if (category) url.searchParams.append("category", category);
      if (location) url.searchParams.append("location", location);
      if (sortBy) url.searchParams.append("sortBy", sortBy);
      if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    
      const data = await response.json();
    
      return data.map((artist: any) => this.mapToTattooArtist(artist));
    }

    async registerTattooArtist(data: TattooArtistRequest, profilePicture: File | null): Promise<{ id: number }> {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("request", jsonBlob);
    
      if (profilePicture) {
        formData.append("profile_img", profilePicture);
      }
    
    
      const response = await fetch(`http://localhost:8089/tattoo-artist/register`, {
        method: "POST",
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error('Erro ao registrar tatuador');
      }
    
      const responseData = await response.json();
      
      return { id: responseData.id };
    }

    async updateTattooArtist(id: string, data: UpdateTattooArtistRequest, profilePicture: File | null): Promise<TattooArtist> {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("request", jsonBlob);
    
      if (profilePicture) {
        formData.append("profile_img", profilePicture);
      }
    
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
    
      const response = await fetch(`http://localhost:8089/tattoo-artist/${id}`, {
        method: "PUT",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    
      if (!response.ok) {
        throw new Error('Erro ao editar tatuador');
      }
    
      const responseData = await response.json();
      return this.mapToTattooArtist(responseData);
    }

    async addPortifolioImages(id: string , images: File[] | null): Promise<TattooArtist> {
      const formData = new FormData();
    
      if (images) {
        images.forEach((image) => {
          formData.append("images", image); 
        });
      }
    
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
    
      const response = await fetch(`http://localhost:8089/tattoo-artist/portifolio/${id}`, {
        method: "PUT",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    
      if (!response.ok) {
        throw new Error('Erro ao adicionar imagens de portifolio');
      }
    
      const responseData = await response.json();
      return this.mapToTattooArtist(responseData);
    }

    async getTattooArtistLocations(): Promise<string[]> {
      const response = await fetch(`http://localhost:8089/tattoo-artist/cities`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      return data;
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
      updatedAt: data.updatedAt,
      images: data.images,
      profilePicture: data.profilePicture
    };
  }

}
