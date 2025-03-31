import { ErrorObject } from '../models/shared/error.model.ts';

export function checkId(id: string): boolean {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
        throw new ErrorObject('Bad Request', `L'ID ${id} n'est pas valide. Il doit être une chaîne de 24 caractères hexadécimaux`);
    return true;
}