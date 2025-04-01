import { writable } from "svelte/store";
import type { Recipe } from "../types/recipe";
import { recipeService } from "../services/recipe";
import type { AddRecipe } from "../types/add-recipe";
import type { UpdateRecipe } from "../types/update-recipe";
import { ServiceError } from "$lib/Shared/models/service-error";

export const recipes = writable<Recipe[]>([]);
export const error = writable<ServiceError | null>(null);
export const loading = writable<boolean>(false);

function createRecipeStore() {
    function resetData() {
        loading.set(true);
        error.set(null);
    }

    return {
        load: async () => {
            resetData();
            try {
                recipes.set(await recipeService.getAllRecipes());
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        loadOne: async (id: string) => {
            resetData();
            try {
                recipes.set([await recipeService.getRecipe(id)]);
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        create: async (_recipe: AddRecipe) => {
            resetData();
            try {
                const newRecipe = await recipeService.createRecipe(_recipe);
                recipes.update(recipes => [...recipes, newRecipe]);
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        update: async (_recipe: UpdateRecipe) => {
            resetData();
            try {
                const updatedRecipe = await recipeService.updateRecipe(_recipe);
                recipes.update(recipes => recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        delete: async (id: string) => {
            resetData();
            try {
                await recipeService.deleteRecipe(id);
                recipes.update(recipes => recipes.filter(r => r.id !== id));
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },
    };
};

export const recipeStore = createRecipeStore();