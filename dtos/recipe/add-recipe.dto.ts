import { Recipe } from "../../models/recipe.model";

export class AddRecipeDTO {
    name: string;
    ingredientsId: string[];
    description: string;
    step: string;
    categoriesId: string[];
    time: number;
    origin: string;

    constructor(
        name: string,
        ingredientsId: string[],
        description: string,
        step: string,
        categoriesId: string[],
        time: number,
        origin: string,
        id?: string
    ) {
        this.name = name;
        this.ingredientsId = ingredientsId;
        this.description = description;
        this.step = step;
        this.categoriesId = categoriesId;
        this.time = time;
        this.origin = origin;
    }

    static validate(data: AddRecipeDTO): AddRecipeDTO {
        if (!data.name || data.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!data.ingredientsId || data.ingredientsId.length === 0) {
            throw new Error("La recette doit contenir au moins un ingrédient.");
        }
        return data;
    }
}