import { CategoryDTO } from '../category/category.dto.ts';
import { IngredientDTO } from '../ingredient/ingredient.dto.ts';
import { Recipe } from "../../models/recipe/recipe.model.ts";

export class RecipeDTO {
    id: string;
    name: string;
    ingredients: IngredientDTO[];
    description: string;
    step: string;
    categories: CategoryDTO[];
    time: number;
    origin: string;
    image: string;

    constructor(id: string,
                name: string,
                ingredients: IngredientDTO[],
                description: string,
                step: string,
                categories: CategoryDTO[],
                time: number,
                origin: string,
                image: string,
            ) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.description = description;
        this.step = step;
        this.categories = categories;
        this.time = time;
        this.origin = origin;
        this.image = image;
    }

    static fromModel(model: Recipe): RecipeDTO {
        return new RecipeDTO(
            model.id,
            model.name,
            model.ingredients.filter((ingredient) => typeof ingredient !== 'string').map(IngredientDTO.fromModel),
            model.description,
            model.step,
            model.categories.filter((categorie) => typeof categorie !== 'string').map(CategoryDTO.fromModel),
            model.time,
            model.origin,
            model.image ? model.image : '',
        );
    }
}