import { AddIngredientDTO } from "../dtos/ingredient/add-ingredient.dto.ts";
import { IngredientDTO } from "../dtos/ingredient/ingredient.dto.ts";
import { UpdateIngredientDTO } from "../dtos/ingredient/update-ingredient.dto.ts";
import { Ingredient } from "../models/ingredient.model.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";

export class IngredientService {

    private readonly ingredientRepository: IngredientRepository = new IngredientRepository();

    async getAllIngredients(): Promise<IngredientDTO[]> {
        const ingredients = await this.ingredientRepository.getAllIngredients()
        return ingredients.map(ingredient => IngredientDTO.fromModel(ingredient))
    }

    async getIngredientById(id: string): Promise<IngredientDTO> {
        const ingredient = await this.ingredientRepository.getIngredientById(id)
        return IngredientDTO.fromModel(ingredient)
    }

    async createIngredient(ingredientTdo: AddIngredientDTO): Promise<IngredientDTO> {
        let ingredient: Ingredient = {
            id: '',
            name: ingredientTdo.name,
            categoriesId: ingredientTdo.categoriesId
        }
        ingredient = await this.ingredientRepository.createIngredient(ingredient)
        return IngredientDTO.fromModel(ingredient)
    }

    async updateIngredient(ingredient: UpdateIngredientDTO): Promise<IngredientDTO> {
        let ingredientModel = await this.ingredientRepository.getIngredientById(ingredient.id)
        ingredientModel = {
            id: ingredient.id,
            name: ingredient.name || ingredientModel.name,
            categoriesId: ingredient.categoriesId || ingredientModel.categoriesId
        }
        ingredientModel = await this.ingredientRepository.updateIngredient(ingredientModel.id, ingredientModel)
        return IngredientDTO.fromModel(ingredientModel)
    }

    async deleteIngredient(id: string): Promise<void> {
        return await this.ingredientRepository.deleteIngredient(id)
    }
}