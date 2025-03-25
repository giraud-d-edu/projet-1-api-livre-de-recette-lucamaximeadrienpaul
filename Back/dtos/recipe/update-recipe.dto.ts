import { ErrorObject } from "../../models/error.model.ts";
import { Recipe } from "../../models/recipe.model.ts";

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

    validate(): void {
            if (this.name && this.name.length > 255) {
                throw new ErrorObject('Not Found', "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
            }
            if (this.ingredientsId && this.ingredientsId.length === 0) {
                throw new ErrorObject('Not Found', "La recette doit contenir au moins un ingrédient.");
            }
            if (this.description && this.description.length === 0) {
                throw new ErrorObject('Not Found', "La recette doit contenir une description.");
            }
            if (this.step && this.step.length === 0) {
                throw new ErrorObject('Not Found', "La recette doit contenir une étape.");
            }
            if (this.categoriesId && this.categoriesId.length === 0) {
                throw new ErrorObject('Not Found', "La recette doit contenir au moins une catégorie.");
            }
            if (this.time && this.time < 0) {
                throw new ErrorObject('Not Found', "Le temps de préparation doit être positif.");
            }
            if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
                throw new ErrorObject('Not Found', `les id des categories doivent être une chaîne de 24 caractères hexadécimaux`);
            }
            if (this.ingredientsId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
                throw new ErrorObject('Not Found', `les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux`);
            }
    }

    static fromRequest(request: any): UpdateRecipeDTO {
        return new UpdateRecipeDTO(
            request.id,
            request.name,
            request.ingredientsId,
            request.description,
            request.step,
            request.categoriesId,
            request.time,
            request.origin
        );
    }
}