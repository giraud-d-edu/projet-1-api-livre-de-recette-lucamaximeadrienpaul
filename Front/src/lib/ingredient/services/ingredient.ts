import type { Ingredient } from '../types/ingredient.ts';
import { API_URL } from '../../Shared/services/const.ts';

const URL = `${API_URL}/ingredient/`;

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    console.log(response);
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return response.json() as Promise<T>;
}

export const ingredientService = {
    getAllIngredients: (): Promise<Ingredient[]> => request(URL, { method: 'GET' }),
    getIngredient: (id: string): Promise<Ingredient> => request(`${URL}${id}`, { method: 'GET' }),
    createIngredient: (ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> => request(URL, {
        method: 'POST',
        body: JSON.stringify(ingredient),
    }),
    updateIngredient: (ingredient: Ingredient): Promise<Ingredient> => request(`${URL}${ingredient.id}`, {
        method: 'PUT',
        body: JSON.stringify(ingredient),
    }),
    deleteIngredient: (id: string): Promise<void> => request(`${URL}${id}`, { method: 'DELETE' }),
};