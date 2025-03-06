import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export class AddRecipeDTO {

    constructor(
        public name: string,
        public ingredientsId: string[],
        public description: string,
        public step: string,
        public categoriesId: string[],
        public time: number,
        public origin?: string
    ) { }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw createHttpError(400, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!this.ingredientsId || this.ingredientsId.length === 0) {
            throw createHttpError(400, "La recette doit contenir au moins un ingrédient.");
        }
        if (!this.description || this.description.length === 0) {
            throw createHttpError(400, "La recette doit contenir une description.");
        }
        if (!this.step || this.step.length === 0) {
            throw createHttpError(400, "La recette doit contenir une étape.");
        }
        if (!this.categoriesId || this.categoriesId.length === 0) {
            throw createHttpError(400, "La recette doit contenir au moins une catégorie.");
        }
        if (!this.time || this.time < 0) {
            throw createHttpError(400, "Le temps de préparation doit être positif.");
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw createHttpError(400, `les id des categories doivent être une chaîne de 24 caractères hexadécimaux`);
        }
        if (this.ingredientsId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw createHttpError(400, `les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux`);
        }
    }

    static fromRequest(request: any): AddRecipeDTO {
        return new AddRecipeDTO(
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