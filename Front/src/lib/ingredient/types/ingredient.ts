import type { Category } from "$lib/category/types/category";

export type Ingredient = {
    id: string,
    name: string,
    categories: Category[],
}