import { Category} from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/categoryRepository";

export class CategoryApi implements CategoryRepository {

    async getAllCategories(): Promise<Category[]> {
        const response = await fetch(`http://localhost:8089/category`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
    
        const data = await response.json();
        return data.map((category: any) => this.mapToCategory(category));
    }

    private mapToCategory(data: any): Category {
        return {
          id: data.id,
          name: data.name,
        };
    }


}
