import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Ingredient } from "../models/ingredient.ts";

export class IngredientDBO {
    _id: ObjectId;
    name: string;
    categoriesId: ObjectId[];

    constructor(id : string, name: string, categoriesId: string[]) {
        this._id = new ObjectId(id);
        this.name = name;
        this.categoriesId = categoriesId.map(id => new ObjectId(id));
    }
    static fromIngredient(ingredient: Ingredient): IngredientDBO {
        return new IngredientDBO(ingredient.id, ingredient.name, ingredient.categoriesId);
    }
    static toIngredient(ingredientDBO: IngredientDBO): Ingredient {
        return {
            id: ingredientDBO._id.toString(),
            name: ingredientDBO.name,
            categoriesId: ingredientDBO.categoriesId.map(id => id.toString()),
        };
    }
}