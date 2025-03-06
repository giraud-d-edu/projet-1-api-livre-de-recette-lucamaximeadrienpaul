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

    toModel(): Ingredient {
        return {
            id: this.id,
            name: this.name,
            categoriesId: this.categoriesId
        };
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }
}