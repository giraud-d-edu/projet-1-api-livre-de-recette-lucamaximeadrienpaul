import { Recipe } from "../../models/recipe.model.ts";

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
}