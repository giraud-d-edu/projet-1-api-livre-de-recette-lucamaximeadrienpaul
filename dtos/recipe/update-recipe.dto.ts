import {IngredientDTO} from "../ingredient/ingredient.dto";

export interface UpdateRecipeDTO {
    id?: string;
    name?: string;
    description?: string;
    ingredients?: IngredientDTO[];
}
