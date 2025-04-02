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

    async registerTattooArtist(data: TattooArtistRequest, profilePicture: File | null): Promise<{ id: number }> {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("request", jsonBlob);
    
      if (profilePicture) {
        formData.append("profile_img", profilePicture);
      }
    
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
    
      const response = await fetch(`http://localhost:8089/tattoo-artist/register`, {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    
      if (!response.ok) {
        throw new Error('Erro ao registrar tatuador');
      }
    
      const responseData = await response.json();
      
      return { id: responseData.id };
    }
    

    // async registerTattooArtist(data: TattooArtistRequest, images: File[] = []): Promise<{ id:number }> {
    //   const formData = new FormData();
  
    //   formData.append("request", JSON.parse(JSON.stringify(data)));
  
    //   images.forEach((image, index) => {
    //     formData.append(`images[${index}]`, image);
    //   });

    //   const storedUser = localStorage.getItem("user");
    //   const token = storedUser ? JSON.parse(storedUser).token : null;
  
    //   const response = await fetch(`http://localhost:8089/tattoo-artist/register`, {
    //     method: "POST",
    //     body: formData,
    //     headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Erro ao registrar tatuador');
    //   }
  
    //   const responseData = await response.json();
  
    //   return { id:responseData.id };
    // }

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
