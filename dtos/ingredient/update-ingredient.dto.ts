import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export class UpdateIngredientDTO {
    id: string;
    name?: string;
    categoriesId?: string[];

    constructor(id: string, name?: string, categoriesId?: string[]) {
        this.id = id;
        this.name = name;
        this.categoriesId = categoriesId;
    }

    validate(): void {
        if (this.name && this.name.length > 255) {
            throw createHttpError(400, "Le nom ne doit pas excéder 255 caractères.");
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw createHttpError(400, `les id des categories doivent être une chaîne de 24 caractères hexadécimaux`);
        }
    }

    static fromRequest(data: any): UpdateIngredientDTO {
        return new UpdateIngredientDTO(
            data.id,
            data.name,
            data.categoriesId
        );
    }
}