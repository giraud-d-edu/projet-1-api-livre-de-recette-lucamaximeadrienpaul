import { Recipe } from "../../models/recipe.model.ts";

export class AddRecipeDTO {
    name: string;
    ingredientsId: string[];
    description: string;
    step: string;

    constructor(
        name: string,
        ingredientsId: string[],
        description: string,
        step: string
    ) {
        this.name = name;
        this.ingredientsId = ingredientsId;
        this.description = description;
        this.step = step;
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!this.ingredientsId || this.ingredientsId.length === 0) {
            throw new Error("La recette doit contenir au moins un ingrédient.");
        }
    }
}