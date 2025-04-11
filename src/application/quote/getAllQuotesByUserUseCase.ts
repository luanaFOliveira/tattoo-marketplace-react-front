import { Quote } from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class GetAllQuotesByUserUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(): Promise<Quote[]> {
    return await this.quoteRepository.getAllQuotesByUser();
  }
}
