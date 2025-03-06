import { FilterRecipeDTO } from './../dtos/recipe/filter-recipe.dto.ts';
import { Recipe } from './../models/recipe.model.ts';
import { RecipeRepository } from './../repositories/recipe.repository.ts';

export class RecipeService {

    constructor(private readonly recipeRepository: RecipeRepository) { }

    async getRecipes(filtersDto: FilterRecipeDTO): Promise<Recipe[]> {
        const filters: { name?: string, categoriesId?: string[], ingredientId?: string[], time?: number } = {}
        if (filtersDto.name) filters.name = filtersDto.name
        if (filtersDto.categoriesId) filters.categoriesId = filtersDto.categoriesId
        if (filtersDto.ingredientId) filters.ingredientId = filtersDto.ingredientId
        if (filtersDto.time) filters.time = filtersDto.time

        return await this.recipeRepository.getRecipes(filters)
    }

    async getRecipeById(id: string): Promise<Recipe> {
        return await this.recipeRepository.getRecipeById(id)
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        return await this.recipeRepository.createRecipe(recipe)
    }

    async updateRecipe(recipe: Recipe): Promise<Recipe> {
        return await this.recipeRepository.updateRecipe(recipe.id, recipe)
    }

    async deleteRecipe(id: string): Promise<void> {
        return await this.recipeRepository.deleteRecipe(id)
    }
}