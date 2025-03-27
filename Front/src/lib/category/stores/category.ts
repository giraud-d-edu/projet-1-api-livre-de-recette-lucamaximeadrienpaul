import { writable } from "svelte/store";
import type { Category } from "../types/category";
import { categoryService } from "../services/category";

export const categories = writable<Category[]>([]);
export const separatedCategories = writable<{[key: string]: Category[]} | null>(null);
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
                const data = await categoryService.getAllCategorys();
                categories.set(data);
                const _separatedCategories: {[key: string]: Category[]} = {};
                data.forEach(category => {
                    if (!_separatedCategories[category.Type]) {
                        _separatedCategories[category.Type] = [];
                    }
                    _separatedCategories[category.Type].push(category);
                });
                separatedCategories.set(_separatedCategories);
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