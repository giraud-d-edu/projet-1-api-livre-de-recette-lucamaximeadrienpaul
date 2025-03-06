import { createHttpError } from "jsr:@oak/commons@1/http_errors";

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
            data.time || null
        )
    }

    public validate(): void {
        if (this.name !== null && this.name.length > 250) {
            throw createHttpError(400, `Le nom de la recette ne doit pas dépasser 250 caractères`);
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw createHttpError(400, `les id des categories doivent être une chaîne de 24 caractères hexadécimaux`);
        }
        if (this.ingredientId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw createHttpError(400, `les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux`);
        }
    }
}