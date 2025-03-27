import type { Recipe } from '../types/recipe';
import { API_URL } from '../../Shared/services/const';
import type { AddRecipe } from '../types/add-recipe';
import type { UpdateRecipe } from '../types/update-recipe';

const URL = `${API_URL}/recipe/`;

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
   
    const headers: HeadersInit = {
        ...(options.headers || {}),
    };

    if (options.body && options.body instanceof FormData) {
        delete (headers as Record<string, string>)['Content-Type'];
    } else {
        (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    const response = await fetch(endpoint, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    return response.json() as Promise<T>;
}


export const recipeService = {
    getAllRecipes: (): Promise<Recipe[]> => request(URL, { method: 'GET' }),
    getRecipe: (id: string): Promise<Recipe> => request(`${URL}${id}`, { method: 'GET' }),
    createRecipe: (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
        const formData = new FormData();
    
        formData.append("name", recipe.name);
        formData.append("description", recipe.description);
        formData.append("step", recipe.step);
        formData.append("time", recipe.time.toString());
        formData.append("origin", recipe.origin || "");
    
        recipe.ingredientsId.forEach(id => formData.append("ingredientsId", id));
        recipe.categoriesId.forEach(id => formData.append("categoriesId", id));
    
        if (recipe.image instanceof File) {
            formData.append("image", recipe.image);
        }
    
        return request(URL, {
            method: 'POST',
            body: formData
        });
    },
    
    updateRecipe: (recipe: Recipe): Promise<Recipe> => {
        const formData = new FormData();

        formData.append("name", recipe.name);
        formData.append("description", recipe.description);
        formData.append("step", recipe.step);
        formData.append("time", recipe.time.toString());
        formData.append("origin", recipe.origin || "");

        recipe.ingredientsId.forEach(id => formData.append("ingredientsId", id));
        recipe.categoriesId.forEach(id => formData.append("categoriesId", id));

        if (recipe.image instanceof File) {
            formData.append("image", recipe.image);
        }

        return request(`${URL}${recipe.id}`, {
            method: 'PUT',
            body: formData
        });
    },
    deleteRecipe: (id: string): Promise<void> => request(`${URL}${id}`, { method: 'DELETE' }),
};