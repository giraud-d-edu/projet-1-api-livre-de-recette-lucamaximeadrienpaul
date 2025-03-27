import { writable } from "svelte/store";
import type { Category } from "../types/category.ts";
import { categoryService } from "../services/category.ts";

export const categories = writable<Category[]>([]);
export const error = writable<string| null>(null);
export const loading = writable<boolean>(false);

function createCategoryStore() {
    function resetData() {
        loading.set(false);
        error.set(null);
    }

    return {
        load: async () => {
            resetData();
            try {
                categories.set(await categoryService.getAllCategorys());
            } catch (err) {
                error.set("Erreur lors du chargement des recettes: " + err);
            }
            loading.set(false);
        },

        loadOne: async (id: string) => {
            resetData();
            try {
                categories.set([await categoryService.getCategory(id)]);
            } catch (err) {
                error.set(`Erreur lors du chargement de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },

        create: async (_category: Omit<Category, "id">) => {
            resetData();
            try {
                const newCategory = await categoryService.createCategory(_category);
                categories.update(categories => [...categories, newCategory]);
            } catch (err) {
                error.set(`Erreur lors de la création de la recette : ${err}`);
            }
            loading.set(false);
        },

        update: async (_category: Category) => {
            resetData();
            try {
                const updatedCategory = await categoryService.updateCategory(_category);
                categories.update(categories => categories.map(r => r.id === updatedCategory.id ? updatedCategory : r));
            } catch (err) {
                error.set(`Erreur lors de la mise à jour de la recette ${_category.id} : ${err}`);
            }
            loading.set(false);
        },

        delete: async (id: string) => {
            resetData();
            try {
                await categoryService.deleteCategory(id);
                categories.update(categories => categories.filter(r => r.id !== id));
            } catch (err) {
                error.set(`Erreur lors de la suppression de la recette ${id} : ${err}`);
            }
            loading.set(false);
        },
    };
};

export const categoryStore = createCategoryStore();