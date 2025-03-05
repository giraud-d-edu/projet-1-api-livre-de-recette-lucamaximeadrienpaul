import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export interface CategoryDTO {
    id?: string;
    name: string;
    description?: string;
}

export function validateCategoryDTO(data: any): CategoryDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { name, description } = data;

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 255) {
        throw createHttpError(400, "Le nom doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    if (description !== undefined && (typeof description !== "string" || description.trim().length === 0 || description.length > 1000)) {
        throw createHttpError(400, "La description doit être une chaîne de caractères entre 1 et 1000 caractères.");
    }

    return data;
}