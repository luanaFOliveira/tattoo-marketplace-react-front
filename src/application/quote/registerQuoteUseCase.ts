import { QuoteRequest } from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class RegisterQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(data: QuoteRequest, images: File[]): Promise<{ id:number }> {
    return await this.quoteRepository.registerQuote(data, images);
  }
}
