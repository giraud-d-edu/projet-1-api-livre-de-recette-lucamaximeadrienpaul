import { Recipe } from "../../models/recipe.model";

export class UpdateRecipeDTO {
    id: string;
    name?: string;
    ingredientsId?: string[];
    description?: string;
    step?: string;
    categoriesId?: string[];
    time?: number;
    origin?: string;

    constructor(
        id: string,
        name?: string,
        ingredientsId?: string[],
        description?: string,
        step?: string,
        categoriesId?: string[],
        time?: number,
        origin?: string
    ) {
        this.id = id;
        this.name = name;
        this.ingredientsId = ingredientsId;
        this.description = description;
        this.step = step;
        this.categoriesId = categoriesId;
        this.time = time;
        this.origin = origin;
    }

    static validate(data: UpdateRecipeDTO): UpdateRecipeDTO {
        if (data.name && data.name.length > 255) {
            throw new Error("Le nom ne doit pas excéder 255 caractères.");
        }
        return data;
    }
}