import { Ingredient } from "../../models/ingredient.model.ts";

export class IngredientDTO {
    id: string;
    name: string;
    categoriesId: string[];

    constructor(id: string, name: string, categoriesId: string[]) {
        this.id = id;
        this.name = name;
        this.categoriesId = categoriesId;
    }

    static fromModel(model: Ingredient): IngredientDTO {
        return new IngredientDTO(model.id, model.name, model.categoriesId);
    }
}