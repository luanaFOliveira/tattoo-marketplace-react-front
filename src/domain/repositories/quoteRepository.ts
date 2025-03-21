import { Quote, QuoteRequest} from "@/domain/entities/quote";


export interface QuoteRepository {
    getQuote(id: string): Promise<Quote>;
    getAllQuotes(): Promise<Quote[]>;
    registerQuote(data: QuoteRequest, images: File[]): Promise<{ id:number }>;
}