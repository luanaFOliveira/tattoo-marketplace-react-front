import { Category } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/categoryRepository";

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories();
  }
}
