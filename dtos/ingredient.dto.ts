import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export interface AddIngredientDTO {
    id?: string;
    name: string;
    quantity: number;
    unit: string;
}

export interface UpdateIngredientDTO {
    id?: string;
    name?: string;
    quantity?: number;
    unit?: string;
}

export interface IngredientDTO {
    id?: string;
    name: string;
    quantity: number;
    unit: string;
}

export function validateAddIngredientDTO(data: any): AddIngredientDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { name, quantity, unit } = data;

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 255) {
        throw createHttpError(400, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères..");
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        throw createHttpError(400, "La quantité doit être un nombre entier positif.");
    }

    if (typeof unit !== "string" || unit.trim().length === 0 || unit.length > 50) {
        throw createHttpError(400, "L'unité doit être une chaîne de caractères entre 1 et 50 caractères.");
    }

    return data;
}

export function validateUpdateIngredientDTO(data: any): UpdateIngredientDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const {name, quantity, unit} = data;

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0 || name.length > 255)) {
        throw createHttpError(400, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    }

    if (quantity !== undefined && (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0)) {
        throw createHttpError(400, "La quantité doit être un nombre entier positif.");
    }

    if (unit !== undefined && (typeof unit !== "string" || unit.trim().length === 0 || unit.length > 50)) {
        throw createHttpError(400, "L'unité doit être une chaîne de caractères entre 1 et 50 caractères.");
    }

    return data;
}