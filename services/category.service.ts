import { Category } from "../models/category.model.ts";
import { CategoryRepository } from "../repositories/category.repository.ts";

export class CategoryService {

    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getAllCategories(): Promise<Category[]> {
        return await  this.categoryRepository.getAllCategories()
    }

    async getCategoryById(id: string): Promise<Category> {
        return await this.categoryRepository.getCategoryById(id)
    }

    async createCategory(category: Category): Promise<Category> {
        return await this.categoryRepository.createCategory(category)
    }

    async updateCategory(category: Category): Promise<Category> {
        return await this.categoryRepository.updateCategory(category.id, category)
    }

    async deleteCategory(id: string): Promise<void> {
        return await this.categoryRepository.deleteCategory(id)
    }
}