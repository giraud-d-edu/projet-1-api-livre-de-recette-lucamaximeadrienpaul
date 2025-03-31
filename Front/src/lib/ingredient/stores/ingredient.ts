import { writable } from 'svelte/store';
import type { Ingredient } from '$lib/ingredient/types/ingredient';
import { ingredientService } from "$lib/ingredient/services/ingredient";
import type { AddIngredient } from '../types/add-ingredient';
import type { UpdateIngredient } from '../types/update-ingredient';

export const ingredients = writable<Ingredient[]>([]);
export const error = writable<string| null>(null);
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
                error.set("Erreur lors du chargement des recettes: " + err);
            }
            loading.set(false);
        },

        loadOne: async (id: string) => {
            resetData();
            try {
                ingredients.set([await ingredientService.getIngredient(id)]);
            } catch (err) {
                error.set(`Erreur lors du chargement de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },

        create: async (_ingredient: AddIngredient) => {
            resetData();
            try {
                const newIngredient = await ingredientService.createIngredient(_ingredient);
                ingredients.update(ingredients => [...ingredients, newIngredient]);
            } catch (err) {
                error.set(`Erreur lors de la création de la recette : ${err}`);
            }
            loading.set(false);
        },

        update: async (_ingredient: UpdateIngredient) => {
            resetData();
            try {
                const updatedIngredient = await ingredientService.updateIngredient(_ingredient);
                ingredients.update(ingredients => ingredients.map(r => r.id === updatedIngredient.id ? updatedIngredient : r));
            } catch (err) {
                error.set(`Erreur lors de la mise à jour de la recette ${_ingredient.id} : ${err}`);
            }
            loading.set(false);
        },

        delete: async (id: string) => {
            resetData();
            try {
                await ingredientService.deleteIngredient(id);
                ingredients.update(ingredients => ingredients.filter(r => r.id !== id));
            } catch (err) {
                error.set(`Erreur lors de la suppression de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },
    };
};

export const ingredientStore = createIngredientStore();