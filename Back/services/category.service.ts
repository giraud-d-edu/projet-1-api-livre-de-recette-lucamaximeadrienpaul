import { AddCategoryDTO } from "../dtos/category/add-category.dto.ts";
import { CategoryDTO } from "../dtos/category/category.dto.ts";
import { UpdateCategoryDTO } from "../dtos/category/update-category.dto.ts";
import { Category } from "../models/category.model.ts";
import { CategoryRepository } from "../repositories/category.repository.ts";
import { FilterCategoryDTO } from "../dtos/category/filter-category.dto.ts";

export class CategoryService {
    constructor(public categoryRepository: CategoryRepository = new CategoryRepository()) {}

    async getAllCategories(filter?: FilterCategoryDTO): Promise<CategoryDTO[]> {
        const type = filter?.type ?? undefined;
        const categories = await this.categoryRepository.getAllCategories(type);
        return categories.map(category => CategoryDTO.fromModel(category));
    }

    async getCategoryById(id: string): Promise<CategoryDTO> {
        const category = await this.categoryRepository.getCategoryById(id);
        return CategoryDTO.fromModel(category);
    }

    async createCategory(categoryDto: AddCategoryDTO): Promise<CategoryDTO> {
        let category: Category = {
            id: '',
            name: categoryDto.name,
            Type: categoryDto.Type
        };
        category = await this.categoryRepository.createCategory(category);
        return CategoryDTO.fromModel(category);
    }

    async updateCategory(categoryDto: UpdateCategoryDTO): Promise<CategoryDTO> {
        let category = await this.categoryRepository.getCategoryById(categoryDto.id);
        category = {
            id: categoryDto.id,
            name: categoryDto.name || category.name,
            Type: categoryDto.Type || category.Type
        };
        category = await this.categoryRepository.updateCategory(category.id, category);
        return CategoryDTO.fromModel(category);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.categoryRepository.deleteCategory(id);
    }
}
