import { Quote, QuoteExtended, QuoteRequest, UpdateQuote } from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class QuoteApi implements QuoteRepository {

    async getQuote(id: string): Promise<QuoteExtended> {
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
        });
    
        const data = await response.json();
    
        return this.mapToQuoteExtended(data);
    }
    
    async getAllQuotesByUser(): Promise<Quote[]> {
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;
        const userId = storedUser ? JSON.parse(storedUser).id : null;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/user/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar quotes por usuario');
        }
    
        const data = await response.json();
    
        return data.map((quote: any) => this.mapToQuote(quote));
    }

    async getAllQuotesByTattooArtist(): Promise<Quote[]> {
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
      const userId = storedUser ? JSON.parse(storedUser).id : null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/tattoo-artist/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar quotes por tatuador');
      }
  
  
      const data = await response.json();
  
      return data.map((quote: any) => this.mapToQuote(quote));
  }

    async registerQuote(data: QuoteRequest, images: File[] = []): Promise<{ id:number }> {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
      formData.append("request", jsonBlob);
  
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/register`, {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
  
      if (!response.ok) {
        throw new Error('Erro ao registrar quote');
      }
  
      const responseData = await response.json();
  
      return { id:responseData.id };
    }

    async updateQuote(id: string, data: UpdateQuote): Promise<Quote> {
      const storedUser = localStorage.getItem("user");
      const token = storedUser ? JSON.parse(storedUser).token : null;
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        throw new Error("Erro ao atualizar quote");
      }
    
      const responseData = await response.json();
    
      return this.mapToQuote(responseData);
    }
    


  private mapToQuote(data: any): Quote {
    return {
      id: data.id,
      description: data.description,
      price: data.price,
      user: data.user,
      tattooArtist: data.tattooArtist,
      status: data.status
    };
  }

  private mapToQuoteExtended(data: any): QuoteExtended {
    return {
        ...this.mapToQuote(data), 
        placement: data.placement || "", 
        color: data.color || "",       
        size: data.size || 0,          
        images: data.images || [],     
    };
  }

}
