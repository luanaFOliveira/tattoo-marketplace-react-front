import { Quote, QuoteExtended} from "@/domain/entities/quote";
import { QuoteRepository } from "@/domain/repositories/quoteRepository";

export class GetQuoteUseCase {
  constructor(private quoteRepository: QuoteRepository) {}

  async execute(id: string): Promise<QuoteExtended> {
    return await this.quoteRepository.getQuote(id);
  }
}
