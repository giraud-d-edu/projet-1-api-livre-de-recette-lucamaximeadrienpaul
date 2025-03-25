import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Ingredient } from "../models/ingredient.model.ts";

export class IngredientDBO {
    _id: ObjectId | null;
    name: string;
    categoriesId: ObjectId[];

    constructor(id : string | null, name: string, categoriesId: string[]) {
        this._id = id ? new ObjectId(id) : null;
        this.name = name;
        this.categoriesId = categoriesId.map(id => new ObjectId(id));
    }
    static fromIngredient(ingredient: Ingredient): IngredientDBO {
        return new IngredientDBO(ingredient.id, ingredient.name, ingredient.categories.map(categorie => typeof categorie === 'string' ? categorie : categorie.id));
    }
    static toIngredient(ingredientDBO: IngredientDBO): Ingredient {
        return {
            id: ingredientDBO._id!.toString(),
            name: ingredientDBO.name,
            categories: ingredientDBO.categoriesId.map(id => id.toString()),
        };
    }
}