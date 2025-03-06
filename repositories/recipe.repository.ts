import { Recipe } from "../models/recipe.model.ts";
import { RecipeDBO } from "../dbos/recipe.dbo.ts";
import { db } from "../db.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
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
            return recipes.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la récupération des recettes: ${error.message}`);
        }
        return query;
    }

    async getRecipes(filters: { [key: string]: any } = {}, sortOption: { [key: string]: 1 | -1 } = { name: 1 }): Promise<Recipe[]> {
        const query = this.buildQuery(filters);
        const recipesDBO = await db.getRecipesCollection().find(query).sort(sortOption).toArray();
        if (recipesDBO.length === 0) {
            throw createHttpError(404, 'Aucune recette trouvée');
        }
        return this.mapRecipesFromDB(recipesDBO);
    }

    async getRecipeById(id: string): Promise<Recipe> {
        try {
            const objectId = new ObjectId(id);
            const recipeD = await db.getRecipesCollection().findOne({ _id: objectId });
            if (!recipeD) {
                throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
            }
            return RecipeDBO.toRecipe(recipeDBO);
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la récupération de la recette: ${error.message}`);
        }
        return RecipeDBO.toRecipe(recipeD);
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        const recipeD = RecipeDBO.fromRecipe(recipe);
        const insertResult = await db.getRecipesCollection().insertOne(recipeD);

            if (!insertResult.acknowledged) {
                throw new Error(500,'Échec de l\'insertion de la recette dans la base de données.');
            }

            return recipe;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la création de la recette: ${error.message}`);
        }
        recipeD._id = insertResult;
        return RecipeDBO.toRecipe(recipeD);
    }

async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
    try {
        const objectId = new ObjectId(id);
        const recipeDBO = RecipeDBO.fromRecipe(recipe);

        const updateResult = await db.getRecipesCollection().updateOne({ _id: objectId },{ $set: recipeDBO });
        if (updateResult.matchedCount === 0) {
            throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
        }
        return recipe;
    } catch (error) {
        throw createHttpError(500, `Erreur lors de la mise à jour de la recette: ${error.message}`);
    }
}


async deleteRecipe(id: string): Promise<void> {
    try {
        const objectId = new ObjectId(id);
        const deleteResult = await db.getRecipesCollection().deleteOne({ _id: objectId });
        if (deleteResult.deletedCount === 0) {
            throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
        }
    } catch (error) {
        throw createHttpError(500, `Erreur lors de la suppression de la recette: ${error.message}`);
    }

    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        const objectId = new ObjectId(id);
        const recipeD = RecipeDBO.fromRecipe(recipe);

        const updateResult = await db.getRecipesCollection().updateOne({ _id: objectId }, { $set: recipeD });
        if (updateResult.matchedCount === 0) {
            throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
        }
        recipeD._id = objectId;
        return RecipeDBO.toRecipe(recipeD);
    }

    async deleteRecipe(id: string): Promise<void> {
        const objectId = new ObjectId(id);
        const deleteResult = await db.getRecipesCollection().deleteOne({ _id: objectId });
        if (deleteResult.deletedCount === 0) {
            throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
        }
    }

    async searchRecipesByName(name: string): Promise<Recipe[]> {
        try {
            const recipes = await db.getRecipesCollection().find({ name: { $regex: name, $options: 'i' } }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée avec le nom '${name}'`);
            }
            return recipes.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de recettes: ${error.message}`);
        }
    }

    async searchRecipesByIngredient(ingredientId: string): Promise<Recipe[]> {
        try {
            const objectId = new ObjectId(ingredientId);
            const recipes = await db.getRecipesCollection().find({ ingredientsId: objectId }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée avec l'ingrédient ID '${ingredientId}'`);
            }
            return recipes.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de recettes: ${error.message}`);
        }
    }

    async searchRecipesByCategories(categoryIds: string[]): Promise<Recipe[]> {
        try {
            const objectIds = categoryIds.map(id => new ObjectId(id));
            const recipesDBO = await db.getRecipesCollection().find({ categoriesId: { $in: objectIds } }) .toArray();

            if (recipesD.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée pour les catégories ID '${categoryIds.join(", ")}'`);
            }
            return recipesDBO.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de recettes : ${error.message}`);
        }
    }

    async searchRecipesByTime(maxTime: number): Promise<Recipe[]> {
        try {
            const recipes = await db.getRecipesCollection().find({ time: { $lte: maxTime } }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée pour un temps inférieur à ${maxTime} minutes`);
            }
            return recipes.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de recettes: ${error.message}`);
        }
    }
}
