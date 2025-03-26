import { Quote, QuoteRequest} from "@/domain/entities/quote";


export interface QuoteRepository {
    getQuote(id: string): Promise<Quote>;
    getAllQuotesByUser(): Promise<Quote[]>;
    getAllQuotesByTattooArtist(): Promise<Quote[]>;
    registerQuote(data: QuoteRequest, images: File[]): Promise<{ id:number }>;
}