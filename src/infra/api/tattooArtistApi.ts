import { TattooArtistRepository } from "@/domain/repositories/tattooArtistRepository";
import { RateTattooArtistRequest, TattooArtist, TattooArtistApiResponse, TattooArtistExtendedApiResponse, TattooArtistRequest, UpdateTattooArtistRequest } from "@/domain/entities/tattoo-artist";

export class TattooArtistApi implements TattooArtistRepository {

    async getTattooArtist(id: string): Promise<TattooArtist> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        return this.mapToTattooArtist(data);
    }
    
    async getAllTattooArtists(filters: { category?: string, location?: string, name?:string, sortBy?: string, sortOrder?: string }): Promise<TattooArtist[]> {
      const { category, location,name, sortBy, sortOrder } = filters;

      const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist`);

      if (category) url.searchParams.append("category", category);
      if (location) url.searchParams.append("location", location);
      if (name) url.searchParams.append("name", name);
      if (sortBy) url.searchParams.append("sortBy", sortBy);
      if (sortOrder) url.searchParams.append("sortOrder", sortOrder);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    
      const data: TattooArtist[] = await response.json();
    
      return data.map((artist: TattooArtist) => this.mapToTattooArtist(artist));
    }

    async registerTattooArtist(data: TattooArtistRequest, profilePicture: File | null): Promise<{ id: number }> {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("request", jsonBlob);
    
      if (profilePicture) {
        formData.append("profile_img", profilePicture);
      }
    
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/register`, {
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
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/${id}`, {
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
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/portifolio/${id}`, {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/cities`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      return data;
    }

    async rateTattooArtist(id: string, data: RateTattooArtistRequest): Promise<TattooArtist> {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tattoo-artist/rate/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    
      if (!response.ok) {
        throw new Error("Erro ao avaliar o tatuador");
      }
    
      const responseData = await response.json();
      return this.mapToTattooArtist(responseData);
    }


    

  private mapToTattooArtist(data: TattooArtistApiResponse| TattooArtistExtendedApiResponse): TattooArtist {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      location: data.location,
      age: data.age,
      rate: data.rate,
      categories: data.categories,
      createdAt: "createdAt" in data ? data.createdAt : "",
      updatedAt: "updatedAt" in data ? data.updatedAt : "",
      images: "images" in data ? data.images : [],
      profilePicture: data.profilePicture
    };
  }

}
