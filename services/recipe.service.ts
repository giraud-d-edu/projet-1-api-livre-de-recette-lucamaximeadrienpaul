import { Recipe } from './../models/recipe.model.ts';
import { RecipeRepository } from './../repositories/recipe.repository.ts';

export class RecipeService {

    constructor(private readonly recipeRepository: RecipeRepository) {}

    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipeRepository.getAllRecipes()
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