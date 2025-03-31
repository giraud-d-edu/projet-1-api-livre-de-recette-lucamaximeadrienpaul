export type UpdateRecipe = {
    id: string,
    name: string,
    ingredientsId: string[],
    description: string,
    step: string,
    categoriesId: string[],
    time: number,
    origin: string,
    image: File | string | null
}