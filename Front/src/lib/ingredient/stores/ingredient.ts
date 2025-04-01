import { writable } from 'svelte/store';
import type { Ingredient } from '$lib/ingredient/types/ingredient';
import { ingredientService } from "$lib/ingredient/services/ingredient";
import type { AddIngredient } from '../types/add-ingredient';
import type { UpdateIngredient } from '../types/update-ingredient';
import { ServiceError } from '$lib/Shared/models/service-error';

export const ingredients = writable<Ingredient[]>([]);
export const error = writable<ServiceError | null>(null);
export const loading = writable<boolean>(false);

function createIngredientStore() {
    function resetData() {
        loading.set(true);
        error.set(null);
    }

    return {
        load: async () => {
            resetData();
            try {
                ingredients.set(await ingredientService.getAllIngredients());
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
                ingredients.set([await ingredientService.getIngredient(id)]);
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        create: async (_ingredient: AddIngredient) => {
            resetData();
            try {
                const newIngredient = await ingredientService.createIngredient(_ingredient);
                ingredients.update(ingredients => [...ingredients, newIngredient]);
            } catch (err) {
                if (err instanceof ServiceError) {
                    error.set(err);
                } else {
                    error.set(new ServiceError(err as string, 500));
                }
            }
            loading.set(false);
        },

        update: async (_ingredient: UpdateIngredient) => {
            resetData();
            try {
                const updatedIngredient = await ingredientService.updateIngredient(_ingredient);
                ingredients.update(ingredients => ingredients.map(r => r.id === updatedIngredient.id ? updatedIngredient : r));
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
                await ingredientService.deleteIngredient(id);
                ingredients.update(ingredients => ingredients.filter(r => r.id !== id));
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

export const ingredientStore = createIngredientStore();