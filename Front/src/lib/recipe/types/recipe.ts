import type { Category } from "$lib/category/types/category";
import type { Ingredient } from "$lib/ingredient/types/ingredient";

export type Recipe = {
    id:string,
    name:string,
    ingredients:Ingredient[],
    description:string,
    step:string,
    categories:Category[],
    time:number,
    origin:string,
    image :File | null;
}