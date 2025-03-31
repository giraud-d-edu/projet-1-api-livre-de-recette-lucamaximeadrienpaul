import { Category } from "../models/category/category.model.ts";
import { FilterCategory } from "../models/category/filter-category.model.ts";
import { CategoryRepository } from "../repositories/category.repository.ts";

export class CategoryService {
    constructor(public categoryRepository: CategoryRepository = new CategoryRepository()) {}

    async getAllCategories(filter?: FilterCategory): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories(filter);
    }

    async getCategoryById(id: string): Promise<Category> {
        return await this.categoryRepository.getCategoryById(id);
    }

    async createCategory(categoryDto: Category): Promise<Category> {
        let category: Category = {
            id: '',
            name: categoryDto.name,
            Type: categoryDto.Type
        };
        return await this.categoryRepository.createCategory(category);
    }

    async updateCategory(categoryDto: Category): Promise<Category> {
        let category = await this.categoryRepository.getCategoryById(categoryDto.id);
        category = {
            id: categoryDto.id,
            name: categoryDto.name || category.name,
            Type: categoryDto.Type || category.Type
        };
        return await this.categoryRepository.updateCategory(category.id, category);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.categoryRepository.deleteCategory(id);
    }
}
