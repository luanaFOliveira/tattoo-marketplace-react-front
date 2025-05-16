import { Category} from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/categoryRepository";

export class CategoryApi implements CategoryRepository {

    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data: Category[] = await response.json();

        return data.map((category: Category) => this.mapToCategory(category));
    }

    private mapToCategory(data: Category): Category {
        return {
          id: data.id,
          name: data.name,
        };
    }


}
