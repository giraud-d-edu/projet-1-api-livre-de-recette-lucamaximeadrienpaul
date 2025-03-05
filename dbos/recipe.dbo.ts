import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Recipe } from "../models/recipe.ts";

export class RecipeDBO {
    _id: ObjectId;
    name: string;
    ingredientsId: ObjectId[];
    description: string;
    categoriesId: ObjectId[];
    time: number;
    origin: string;

    constructor(id : string, name: string, ingredientsId: string[], description: string, categoriesId: string[], time: number, origin: string) {
        this._id = new ObjectId(id);
        this.name = name;
        this.ingredientsId = ingredientsId.map(id => new ObjectId(id));
        this.description = description;
        this.categoriesId = categoriesId.map(id => new ObjectId(id));
        this.time = time;
        this.origin = origin;
    }
    static fromRecipe(recipe: Recipe): RecipeDBO {
        return new RecipeDBO(recipe.id, recipe.name, recipe.ingredientsId, recipe.description, recipe.categoriesId, recipe.time, recipe.origin);
    }
    static toRecipe(recipeDBO: RecipeDBO): Recipe {
        return {
            id: recipeDBO._id.toString(),
            name: recipeDBO.name,
            ingredientsId: recipeDBO.ingredientsId.map(id => id.toString()),
            description: recipeDBO.description,
            categoriesId: recipeDBO.categoriesId.map(id => id.toString()),
            time: recipeDBO.time,
            origin: recipeDBO.origin,
        };
    }
}