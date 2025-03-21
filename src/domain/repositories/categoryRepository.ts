import { Category } from "@/domain/entities/category";


export interface CategoryRepository {
    getAllCategories(): Promise<Category[]>;
}