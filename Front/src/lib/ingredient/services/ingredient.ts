import type { Ingredient } from '../types/ingredient';
import { API_URL } from '../../Shared/services/const';
import type { AddIngredient } from '../types/add-ingredient';
import type { UpdateIngredient } from '../types/update-ingredient';

const URL = `${API_URL}/ingredient/`;

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return response.json() as Promise<T>;
}

export const ingredientService = {
    getAllIngredients: (): Promise<Ingredient[]> => request(URL, { method: 'GET' }),
    getIngredient: (id: string): Promise<Ingredient> => request(`${URL}${id}`, { method: 'GET' }),
    createIngredient: (ingredient: AddIngredient): Promise<Ingredient> => request(URL, {
        method: 'POST',
        body: JSON.stringify(ingredient),
    }),
    updateIngredient: (ingredient: UpdateIngredient): Promise<Ingredient> => request(`${URL}${ingredient.id}`, {
        method: 'PUT',
        body: JSON.stringify(ingredient),
    }),
    deleteIngredient: (id: string): Promise<void> => request(`${URL}${id}`, { method: 'DELETE' }),
};