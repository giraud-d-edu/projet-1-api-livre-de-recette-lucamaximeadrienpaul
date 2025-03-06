import { Ingredient } from "../../models/ingredient.model";

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

    toModel(): Ingredient {
        return {
            id: this.id,
            name: this.name,
            categoriesId: this.categoriesId
        };
    }

    static validateIngredientDTO(data: IngredientDTO): IngredientDTO {
        if (!data.name || data.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        return data;
    }
}