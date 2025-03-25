import type { Recipe } from '../types/recipe.ts';
import { API_URL } from '../../Shared/services/const.ts';

const URL = `${API_URL}/recipe/`;

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

export const recipeService = {
    getAllRecipes: (): Promise<Recipe[]> => request(URL, { method: 'GET' }),
    getRecipe: (id: string): Promise<Recipe> => request(`${URL}${id}`, { method: 'GET' }),
    createRecipe: (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => request(URL, {
        method: 'POST',
        body: JSON.stringify(recipe),
    }),
    updateRecipe: (recipe: Recipe): Promise<Recipe> => request(`${URL}${recipe.id}`, {
        method: 'PUT',
        body: JSON.stringify(recipe),
    }),
    deleteRecipe: (id: string): Promise<void> => request(`${URL}${id}`, { method: 'DELETE' }),
};