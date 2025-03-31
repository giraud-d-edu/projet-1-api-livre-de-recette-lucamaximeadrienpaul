import { Category } from "../category/category.model.ts";

export type Ingredient = {
    id: string,
    name: string,
    categories: string[] | Category[],
  }