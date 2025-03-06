import { Ingredient } from "../models/ingredient.model.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";

export class IngredientService {

    constructor(private readonly ingredientRepository: IngredientRepository) {}

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
        return await this.ingredientRepository.updateIngredient(ingredient.id, ingredient)
    }

    async deleteIngredient(id: string): Promise<void> {
        return await this.ingredientRepository.deleteIngredient(id)
    }
}