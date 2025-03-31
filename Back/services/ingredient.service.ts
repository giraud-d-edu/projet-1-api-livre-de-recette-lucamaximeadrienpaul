import { Ingredient } from "../models/ingredient/ingredient.model.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";

export class IngredientService {

    private readonly ingredientRepository: IngredientRepository = new IngredientRepository();

    async getAllIngredients(): Promise<Ingredient[]> {
        return await this.ingredientRepository.getAllIngredients()
    }

    async getIngredientById(id: string): Promise<Ingredient> {
        return await this.ingredientRepository.getIngredientById(id)
    }

    async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return await this.ingredientRepository.createIngredient(ingredient)
    }

    async updateIngredient(ingredient: Ingredient): Promise<Ingredient> {
        let ingredientModel = await this.ingredientRepository.getIngredientById(ingredient.id)
        ingredientModel = {
            ...ingredientModel,
            ...ingredient
        }
        return await this.ingredientRepository.updateIngredient(ingredientModel.id, ingredientModel)
    }

    async deleteIngredient(id: string): Promise<void> {
        return await this.ingredientRepository.deleteIngredient(id)
    }
}