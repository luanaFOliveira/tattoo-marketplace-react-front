import { Quote, QuoteRequest } from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class QuoteApi implements QuoteRepository {

    async getQuote(id: string): Promise<Quote> {
        const response = await fetch(`http://localhost:8089/quote/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return this.mapToQuote(data);
    }
    
    async getAllQuotes(): Promise<Quote[]> {
        const response = await fetch(`http://localhost:8089/quote`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
    
        return data.map((artist: any) => this.mapToQuote(artist));
    }

    async registerQuote(data: QuoteRequest, images: File[] = []): Promise<{ id:number }> {
      const formData = new FormData();
  
      formData.append("request", JSON.parse(JSON.stringify(data)));
  
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
  
      const response = await fetch(`http://localhost:8089/quote/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Erro ao registrar quote');
      }
  
      const responseData = await response.json();
  
      return { id:responseData.id };
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

}
