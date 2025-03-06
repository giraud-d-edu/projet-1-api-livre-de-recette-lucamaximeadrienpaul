import { AddCategoryDTO } from "../dtos/category/add-category.dto.ts";
import { CategoryDTO } from "../dtos/category/category.dto.ts";
import { UpdateCategoryDTO } from "../dtos/category/update-category.dto.ts";
import { Category } from "../models/category.model.ts";
import { CategoryRepository } from "../repositories/category.repository.ts";

export class CategoryService {

    private readonly categoryRepository: CategoryRepository = new CategoryRepository();

    async getAllCategories(): Promise<CategoryDTO[]> {
        const categories = await  this.categoryRepository.getAllCategories()
        return categories.map(category => CategoryDTO.fromModel(category))
    }

    async getCategoryById(id: string): Promise<CategoryDTO> {
        const category = await this.categoryRepository.getCategoryById(id)
        return CategoryDTO.fromModel(category)
    }

    async createCategory(categoryTdo: AddCategoryDTO): Promise<CategoryDTO> {
        let category: Category = {
            id: '',
            name: categoryTdo.name,
            Type: categoryTdo.Type
        }
        category = await this.categoryRepository.createCategory(category)
        return CategoryDTO.fromModel(category)
    }

    async updateCategory(categoryTdo: UpdateCategoryDTO): Promise<CategoryDTO> {
        let category = await this.categoryRepository.getCategoryById(categoryTdo.id)
        category = {
            id: categoryTdo.id,
            name: categoryTdo.name || category.name,
            Type: categoryTdo.Type || category.Type
        }
        category = await this.categoryRepository.updateCategory(category.id, category)
        return CategoryDTO.fromModel(category)
    }

    async deleteCategory(id: string): Promise<void> {
        await this.categoryRepository.deleteCategory(id)
    }
}