import { Ingredient } from "./ingredient.model.ts";
import { Category } from "./category.model.ts";

export type Recipe = {
    id: string,
    name: string,
    ingredients: string[] | Ingredient[],
    description: string,
    step: string,
    categories: string[] | Category[],
    time: number,
    origin: string
    image?: string | null
  }