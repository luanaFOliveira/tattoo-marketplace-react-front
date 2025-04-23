import { Quote, QuoteExtended, QuoteRequest, UpdateQuote} from "@/domain/entities/quote";


export interface QuoteRepository {
    getQuote(id: string): Promise<QuoteExtended>;
    getAllQuotesByUser(): Promise<Quote[]>;
    getAllQuotesByTattooArtist(): Promise<Quote[]>;
    registerQuote(data: QuoteRequest, images: File[]): Promise<{ id:number }>;
    updateQuote(id: string, data: UpdateQuote): Promise<Quote>;
}