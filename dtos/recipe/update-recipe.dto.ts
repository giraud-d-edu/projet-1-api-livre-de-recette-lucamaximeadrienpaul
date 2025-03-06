export interface UpdateRecipeDTO {
    id: string;
    name?: string;
    ingredientsId?: string[];
    description?: string;
    step?: string;
    categoriesId?: string[];
    time?: number;
    origin?: string;
}