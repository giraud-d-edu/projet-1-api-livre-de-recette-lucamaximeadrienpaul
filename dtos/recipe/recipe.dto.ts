import { Recipe } from "../../models/recipe.model";

export class RecipeDTO {
    id: string;
    name: string;
    ingredientsId: string[];
    description: string;
    step: string;
    categoriesId: string[];
    time: number;
    origin: string;

    constructor(id: string,
                name: string,
                ingredientsId: string[],
                description: string,
                step: string,
                categoriesId: string[],
                time: number,
                origin: string) {
        this.id = id;
        this.name = name;
        this.ingredientsId = ingredientsId;
        this.description = description;
        this.step = step;
        this.categoriesId = categoriesId;
        this.time = time;
        this.origin = origin;
    }

    static fromModel(model: Recipe): RecipeDTO {
        return new RecipeDTO(
            model.id,
            model.name,
            model.ingredientsId,
            model.description,
            model.step,
            model.categoriesId,
            model.time,
            model.origin
        );
    }

    toModel(): Recipe {
        return {
            id: this.id,
            name: this.name,
            ingredientsId: this.ingredientsId,
            description: this.description,
            step: this.step,
            categoriesId: this.categoriesId,
            time: this.time,
            origin: this.origin
        };
    }

    static validateRecipeDTO(data: RecipeDTO): RecipeDTO {
        if (!data.name || data.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!data.ingredientsId || data.ingredientsId.length === 0) {
            throw new Error("La recette doit contenir au moins un ingrédient.");
        }
        return data;
    }
}