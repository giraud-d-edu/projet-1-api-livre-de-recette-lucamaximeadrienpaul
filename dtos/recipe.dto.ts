import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { IngredientDTO } from "./ingredient.dto.ts";

export interface AddRecipeDTO {
    id?: string;
    name: string;
    quantity: number;
    unit: string;
}

export interface UpdateRecipeDTO {
    id?: string;
    name?: string;
    description?: string;
    ingredients?: IngredientDTO[];
}

export interface RecipeDTO {
    id?: string;
    name: string;
    description: string;
    ingredients: IngredientDTO[];
}

export function validateAddRecipeDTO(data: any): AddRecipeDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { name, quantity, unit } = data;

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 255) {
        throw createHttpError(400, "Le nom doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        throw createHttpError(400, "La quantité doit être un nombre entier positif.");
    }

    if (typeof unit !== "string" || unit.trim().length === 0 || unit.length > 50) {
        throw createHttpError(400, "L'unité doit être une chaîne de caractères entre 1 et 50 caractères.");
    }

    return data;
}

export function validateUpdateRecipeDTO(data: any): UpdateRecipeDTO {
    if (typeof data !== "object" || data === null) {
        throw createHttpError(400, "Les données doivent être un objet valide.");
    }

    const { name, description, ingredients } = data;

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0 || name.length > 255)) {
        throw createHttpError(400, "Le nom doit être une chaîne de caractères entre 1 et 255 caractères.");
    }

    if (description !== undefined && (typeof description !== "string" || description.trim().length === 0 || description.length > 1000)) {
        throw createHttpError(400, "La description doit être une chaîne de caractères entre 1 et 1000 caractères.");
    }

    if (ingredients !== undefined && (!Array.isArray(ingredients) || !ingredients.every(ingredient => validateIngredientDTO(ingredient)))) {
        throw createHttpError(400, "Les ingrédients doivent être un tableau d'objets IngredientDTO valides.");
    }

    return data;
}

function validateIngredientDTO(data: any): boolean {
    const { id, name, quantity, unit } = data;

    if (id !== undefined && (typeof id !== "string" || id.trim().length === 0)) {
        return false;
    }

    if (typeof name !== "string" || name.trim().length === 0 || name.length > 255) {
        return false;
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
        return false;
    }

    if (typeof unit !== "string" || unit.trim().length === 0 || unit.length > 50) {
        return false;
    }

    return true;
}