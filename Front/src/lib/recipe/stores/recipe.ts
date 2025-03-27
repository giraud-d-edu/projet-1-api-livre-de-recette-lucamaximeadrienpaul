import { writable } from "svelte/store";
import type { Recipe } from "../types/recipe";
import { recipeService } from "../services/recipe";
import type { AddRecipe } from "../types/add-recipe";
import type { UpdateRecipe } from "../types/update-recipe";

export const recipes = writable<Recipe[]>([]);
export const error = writable<string| null>(null);
export const loading = writable<boolean>(false);

function createRecipeStore() {
    function resetData() {
        loading.set(false);
        error.set(null);
    }

    return {
        load: async () => {
            resetData();
            try {
                recipes.set(await recipeService.getAllRecipes());
            } catch (err) {
                error.set("Erreur lors du chargement des recettes: " + err);
            }
            loading.set(false);
        },

        loadOne: async (id: string) => {
            resetData();
            try {
                recipes.set([await recipeService.getRecipe(id)]);
            } catch (err) {
                error.set(`Erreur lors du chargement de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },

        create: async (_recipe: AddRecipe) => {
            resetData();
            try {
                const newRecipe = await recipeService.createRecipe(_recipe);
                recipes.update(recipes => [...recipes, newRecipe]);
            } catch (err) {
                error.set(`Erreur lors de la création de la recette : ${err}`);
            }
            loading.set(false);
        },

        update: async (_recipe: UpdateRecipe) => {
            resetData();
            try {
                const updatedRecipe = await recipeService.updateRecipe(_recipe);
                recipes.update(recipes => recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
            } catch (err) {
                error.set(`Erreur lors de la mise à jour de la recette ${_recipe.id} : ${err}`);
            }
            loading.set(false);
        },

        delete: async (id: string) => {
            resetData();
            try {
                await recipeService.deleteRecipe(id);
                recipes.update(recipes => recipes.filter(r => r.id !== id));
            } catch (err) {
                error.set(`Erreur lors de la suppression de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },
    };
};

export const recipeStore = createRecipeStore();