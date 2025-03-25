import { Recipe } from "../models/recipe.model.ts";
import { RecipeDBO } from "../dbos/recipe.dbo.ts";
import { db } from "../db.ts";
import { ErrorObject } from "../models/error.model.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

export class RecipeRepository {

    private mapRecipesFromDB(recipesDBO: RecipeDBO[]): Recipe[] {
        return recipesDBO.map((recipeD: RecipeDBO) => RecipeDBO.toRecipe(recipeD));
    }

    private buildQuery(filters: { [key: string]: any }): { [key: string]: any } {
        const query: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(filters)) {
            switch (key) {
                case "time":
                    typeof value === "number" && (query["time"] = { $lte: value });
                    break;
                case "name":
                    typeof value === "string" && (query["name"] = { $regex: value, $options: "i" });
                    break;
                case "categoriesId":
                    Array.isArray(value) && (query["categoriesId"] = { $in: value.map(id => new ObjectId(id)) });
                    break;
                case "ingredientsId":
                    Array.isArray(value) && (query["ingredientsId"] = { $in: value.map(id => new ObjectId(id)) });
                    break;
                default:
                    value && (query[key] = value);
                    break;
            }
        }
        return query;
    }

    async getRecipes(filters: { [key: string]: any } = {}, sortOption: { [key: string]: 1 | -1 } = { name: 1 }): Promise<Recipe[]> {
        const query = this.buildQuery(filters);
        const recipesDBO = await db.getRecipesCollection().find(query).sort(sortOption).toArray();
        if (recipesDBO.length === 0) {
            throw new ErrorObject('Bad Request',  'Aucune recette trouvée');
        }
        return this.mapRecipesFromDB(recipesDBO);
    }

    async getRecipeById(id: string): Promise<Recipe> {
        const objectId = new ObjectId(id);
        const recipeD = await db.getRecipesCollection().findOne({ _id: objectId });
        if (!recipeD) {
            throw new ErrorObject('Bad Request',  `Recette avec l'ID ${id} non trouvée`);
        }
        return RecipeDBO.toRecipe(recipeD);
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        if (recipe.categoriesId && Array.isArray(recipe.categoriesId)) {
          for (const catId of recipe.categoriesId) {
            const category = await db.getCategoryCollection().findOne({ _id: new ObjectId(catId) });
            if (!category) {
              throw new ErrorObject('Internal Server Error', `La catégorie avec l'ID ${catId} n'existe pas.`);
            }
          }
        }
        if (recipe.ingredientsId && Array.isArray(recipe.ingredientsId)) {
          for (const ingId of recipe.ingredientsId) {
            const ingredient = await db.getIngredientsCollection().findOne({ _id: new ObjectId(ingId) });
            if (!ingredient) {
              throw new ErrorObject(`Bad Request`, `L'ingrédient avec l'ID ${ingId} n'existe pas.`);
            }
          }
        }
        const recipeD = RecipeDBO.fromRecipe(recipe);
        const insertResult = await db.getRecipesCollection().insertOne(recipeD);
        if (!insertResult) {
            throw new ErrorObject('Internal Server Error',  'Échec de l\'insertion de la recette dans la base de données.');
        }
        recipeD._id = insertResult;
        return RecipeDBO.toRecipe(recipeD);
      }

    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        const objectId = new ObjectId(id);
        const recipeD = RecipeDBO.fromRecipe(recipe);

        const updateResult = await db.getRecipesCollection().updateOne({ _id: objectId }, { $set: recipeD });
        if (updateResult.matchedCount === 0) {
            throw new ErrorObject('Bad Request',  `Recette avec l'ID ${id} non trouvée`);
        }
        recipeD._id = objectId;
        return RecipeDBO.toRecipe(recipeD);
    }

    async deleteRecipe(id: string): Promise<void> {
        const objectId = new ObjectId(id);
        const deleteResult = await db.getRecipesCollection().deleteOne({ _id: objectId });
        if (deleteResult.deletedCount === 0) {
            throw new ErrorObject('Bad Request',  `Recette avec l'ID ${id} non trouvée`);
        }
    }
}
