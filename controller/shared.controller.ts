import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

export function checkId(id: string): boolean {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
        throw createHttpError(404, `L'ID ${id} n'est pas valide. Il doit être une chaîne de 24 caractères hexadécimaux`);
    return true;
}