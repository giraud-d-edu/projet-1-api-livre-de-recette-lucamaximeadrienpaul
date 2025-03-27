import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Recipe } from "../models/recipe.model.ts";

export class RecipeDBO {
    _id: ObjectId | null;
    name: string;
    ingredientsId: ObjectId[];
    description: string;
    step: string;
    categoriesId: ObjectId[];
    time: number;
    origin: string;
    image?: string | null;

    constructor(id : string| null, name: string, ingredientsId: string[], description: string,step: string, categoriesId: string[], time: number, origin: string, image : string | null = null) {
        this._id = id ? new ObjectId(id) : null;
        this.name = name;
        this.ingredientsId = ingredientsId.map(id => new ObjectId(id));
        this.description = description;
        this.categoriesId = categoriesId.map(id => new ObjectId(id));
        this.time = time;
        this.step = step;
        this.origin = origin;
        this.image = image;
    }
    static fromRecipe(recipe: Recipe): RecipeDBO {
        return new RecipeDBO(
            recipe.id,
            recipe.name,
            recipe.ingredients.map((ingredients) => typeof ingredients === 'string' ? ingredients : ingredients.id),
            recipe.description, recipe.step,
            recipe.categories.map((categorie) => typeof categorie === 'string' ? categorie : categorie.id)
            , recipe.time,
            recipe.origin,
            recipe.image
        );
    }
    static toRecipe(recipeDBO: RecipeDBO): Recipe {
        return {
            id: recipeDBO._id!.toString(),
            name: recipeDBO.name,
            ingredients: recipeDBO.ingredientsId.map(id => id.toString()),
            description: recipeDBO.description,
            step: recipeDBO.step,
            categories: recipeDBO.categoriesId.map(id => id.toString()),
            time: recipeDBO.time,
            origin: recipeDBO.origin,
            image: recipeDBO.image
        };
    }
}