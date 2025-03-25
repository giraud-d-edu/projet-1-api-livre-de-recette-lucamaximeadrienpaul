import { CategoryDTO } from '../category/category.dto.ts';
import { Ingredient } from "../../models/ingredient.model.ts";

export class IngredientDTO {
    id: string;
    name: string;
    categories: CategoryDTO[];

    constructor(id: string, name: string, categories: CategoryDTO[]) {
        this.id = id;
        this.name = name;
        this.categories = categories;
    }

    static fromModel(model: Ingredient): IngredientDTO {
        return new IngredientDTO(model.id, model.name, model.categories.filter((categorie) => typeof categorie !== 'string').map(CategoryDTO.fromModel));
    }
}