import { Quote, UpdateQuote } from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class UpdateQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string, data: UpdateQuote): Promise<Quote> {
    return await this.quoteRepository.updateQuote(id, data);
  }
}
