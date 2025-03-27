import { Recipe } from "../models/recipe.model.ts";
import { RecipeDBO } from "../dbos/recipe.dbo.ts";
import { IngredientRepository } from "./ingredient.repository.ts";
import { CategoryRepository } from "./category.repository.ts";
import { db } from "../db.ts";
import { ErrorObject } from "../models/error.model.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

export class RecipeRepository {

    private async mapRecipesFromDB(recipesDBO: RecipeDBO[]): Promise<Recipe[]> {
        const recipes: Recipe[] = recipesDBO.map((recipeD: RecipeDBO) => RecipeDBO.toRecipe(recipeD));
        const ingredientRepository = new IngredientRepository();
        const categoryRepository = new CategoryRepository();
        for (const recipe of recipes) {
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                recipe.ingredients = await ingredientRepository.getIngredientsByIdArray(recipe.ingredients as string[]);
            }
            if (recipe.categories && Array.isArray(recipe.categories)) {
                recipe.categories = await categoryRepository.getCategoriesByIdArray(recipe.categories as string[]);
            }
        }
        return recipes;
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

    private async checkCategories(recipe: Recipe): Promise<void> {
        if (recipe.categories && Array.isArray(recipe.categories)) {
            for (const categorie of recipe.categories) {
                const categorieId = typeof categorie === 'string' ? categorie : categorie.id;
                const category = await db.getCategoryCollection().findOne({ _id: new ObjectId(categorieId) });
                if (!category) {
                    throw new ErrorObject('Bad Request', `La catégorie avec l'ID ${categorieId} n'existe pas.`);
                }
            }
        }
    }

    private async checkIngredient(recipe: Recipe): Promise<void> {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            for (const ingredient of recipe.ingredients) {
                const ingredientId = typeof ingredient === 'string' ? ingredient : ingredient.id;
                const _id = new ObjectId(ingredientId);
                console.log(_id);
                const _ingredient = await db.getIngredientsCollection().findOne({ _id: _id });
                if (!_ingredient) {
                    throw new ErrorObject('Bad Request', `L'ingredient avec l'ID ${ingredientId} n'existe pas.`);
                }
            }
        }
    }

    async getRecipes(filters: { [key: string]: any } = {}, sortOption: { [key: string]: 1 | -1 } = { name: 1 }): Promise<Recipe[]> {
        const query = this.buildQuery(filters);
        const recipesDBO = await db.getRecipesCollection().find(query).sort(sortOption).toArray();
        if (recipesDBO.length === 0) {
            throw new ErrorObject('Bad Request', 'Aucune recette trouvée');
        }
        return await this.mapRecipesFromDB(recipesDBO);
    }

    async getRecipeById(id: string): Promise<Recipe> {
        const objectId = new ObjectId(id);
        const recipeD = await db.getRecipesCollection().findOne({ _id: objectId });
        if (!recipeD) {
            throw new ErrorObject('Bad Request', `Recette avec l'ID ${id} non trouvée`);
        }
        return (await this.mapRecipesFromDB([recipeD]))[0];
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        await this.checkCategories(recipe);
        await this.checkIngredient(recipe);
        const recipeD = RecipeDBO.fromRecipe(recipe);
        const insertResult = await db.getRecipesCollection().insertOne(recipeD);
        if (!insertResult) {
            throw new ErrorObject('Internal Server Error', 'Échec de l\'insertion de la recette dans la base de données.');
        }
        return await this.getRecipeById(insertResult.toString());
    }

    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        const objectId = new ObjectId(id);
        await this.checkCategories(recipe);
        await this.checkIngredient(recipe);
        const recipeD = RecipeDBO.fromRecipe(recipe);

        const updateResult = await db.getRecipesCollection().updateOne({ _id: objectId }, { $set: recipeD });
        if (updateResult.matchedCount === 0) {
            throw new ErrorObject('Bad Request', `Recette avec l'ID ${id} non trouvée`);
        }
        return await this.getRecipeById(objectId.toString());
    }

    async deleteRecipe(id: string): Promise<void> {
        const objectId = new ObjectId(id);
        const deleteResult = await db.getRecipesCollection().deleteOne({ _id: objectId });
        if (deleteResult.deletedCount === 0) {
            throw new ErrorObject('Bad Request', `Recette avec l'ID ${id} non trouvée`);
        }
    }
}
