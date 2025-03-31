import { ErrorObject } from "../../models/shared/error.model.ts";
import { FilterRecipe } from "../../models/recipe/recipe-filter.model.ts";

export class FilterRecipeDTO {
    constructor(
        public name: string|null,
        public categoriesId: string[]|null,
        public ingredientId: string[]|null,
        public time: number|null
    ) {}

    public static fromRequest(data: any): FilterRecipeDTO {
        return new FilterRecipeDTO(
            data.name || null,
            data.categoriesId || null,
            data.ingredientId || null,
            +data.time || null
        )
    }

    public validate(): void {
        if (this.name !== null && this.name.length > 250) {
            throw new ErrorObject('Not Found', `Le nom de la recette ne doit pas dépasser 250 caractères`);
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Not Found', `les id des categories doivent être une chaîne de 24 caractères hexadécimaux`);
        }
        if (this.ingredientId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Not Found', `les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux`);
        }
    }

    public toModel(): FilterRecipe {
        return {
            name: this.name || undefined,
            categoriesId: this.categoriesId || undefined,
            ingredientId: this.ingredientId || undefined,
            time: this.time || undefined
        };
    }
}