// dtos/recipe.dto.ts
import { IngredientDTO, validateIngredientDTO } from "../ingredient/ingredient.dto.ts";

export class RecipeDTO {
    title: string;
    ingredients: IngredientDTO[];

    constructor(title: string, ingredients: IngredientDTO[]) {
        this.title = title;
        this.ingredients = ingredients;
    }
}

export function validateRecipeDTO(data: RecipeDTO): RecipeDTO {
    if (!data.title || data.title.length > 255) {
        throw new Error("Le titre ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    }
    if (!data.ingredients || data.ingredients.length === 0) {
        throw new Error("La recette doit contenir au moins un ingrédient.");
    }
    data.ingredients.forEach(validateIngredientDTO);
    return data;
}