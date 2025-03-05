import { Recipe } from "../models/recipe.model.ts";
import { RecipeDBO } from "../dbos/recipe.dbo.ts";
import { db } from "../db.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";

export class RecipeRepository {

    private mapRecipesFromDB(recipesDBO: RecipeDBO[]): Recipe[] {
        return recipesDBO.map((recipeD: RecipeDBO) => RecipeDBO.toRecipe(recipeD));
    }

    async getAllRecipes(): Promise<Recipe[]> {
        try {
            const recipes = await db.getRecipesCollection().find().toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, 'Aucune recette trouvée');
            }
            return this.mapRecipesFromDB(recipes);
        } catch {
            throw createHttpError(500, `Erreur lors de la récupération des recettes: `);
        }
    }

    async getRecipeById(id: string): Promise<Recipe> {
        try {
            const objectId = new ObjectId(id);
            const recipeD = await db.getRecipesCollection().findOne({ _id: objectId });
            if (!recipeD) {
                throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
            }
            return RecipeDBO.toRecipe(recipeD);
        } catch {
            throw createHttpError(500, `Erreur lors de la récupération de la recette`);
        }
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            const recipeD = RecipeDBO.fromRecipe(recipe);
            const insertResult = await db.getRecipesCollection().insertOne(recipeD);

            if (!insertResult) {
                throw createHttpError(500, 'Échec de l\'insertion de la recette dans la base de données.');
            }
            recipeD._id = insertResult;
            const newRecipe = RecipeDBO.toRecipe(recipeD);
            return newRecipe;
        } catch {
            throw createHttpError(500, `Erreur lors de la création de la recette`);
        }
    }

    async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
        try {
            const objectId = new ObjectId(id);
            const recipeD = RecipeDBO.fromRecipe(recipe);

            const updateResult = await db.getRecipesCollection().updateOne({ _id: objectId }, { $set: recipeD });
            if (updateResult.matchedCount === 0) {
                throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
            }
            recipeD._id = objectId;
            const newRecipe = RecipeDBO.toRecipe(recipeD);
            return newRecipe;
        } catch {
            throw createHttpError(500, `Erreur lors de la mise à jour de la recette`);
        }
    }

    async deleteRecipe(id: string): Promise<void> {
        try {
            const objectId = new ObjectId(id);
            const deleteResult = await db.getRecipesCollection().deleteOne({ _id: objectId });
            if (deleteResult.deletedCount === 0) {
                throw createHttpError(404, `Recette avec l'ID ${id} non trouvée`);
            }
        } catch {
            throw createHttpError(500, `Erreur lors de la suppression de la recette`);
        }
    }

    async searchRecipesByName(name: string): Promise<Recipe[]> {
        try {
            const recipes = await db.getRecipesCollection().find({ name: { $regex: name, $options: 'i' } }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée avec le nom '${name}'`);
            }
            return this.mapRecipesFromDB(recipes);
        } catch {
            throw createHttpError(500, `Erreur lors de la recherche de recettes`);
        }
    }

    async searchRecipesByIngredient(ingredientId: string): Promise<Recipe[]> {
        try {
            const objectId = new ObjectId(ingredientId);
            const recipes = await db.getRecipesCollection().find({ ingredientsId: objectId }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée avec l'ingrédient ID '${ingredientId}'`);
            }
            return this.mapRecipesFromDB(recipes);
        } catch {
            throw createHttpError(500, `Erreur lors de la recherche de recettes`);
        }
    }

    async searchRecipesByCategories(categoryIds: string[]): Promise<Recipe[]> {
        try {
            const objectIds = categoryIds.map(id => new ObjectId(id));
            const recipesD = await db.getRecipesCollection().find({ categoriesId: { $in: objectIds } }).toArray();

            if (recipesD.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée pour les catégories ID '${categoryIds.join(", ")}'`);
            }
            return this.mapRecipesFromDB(recipesD);
        } catch {
            throw createHttpError(500, `Erreur lors de la recherche de recettes`);
        }
    }

    async searchRecipesByTime(maxTime: number): Promise<Recipe[]> {
        try {
            const recipes = await db.getRecipesCollection().find({ time: { $lte: maxTime } }).toArray();
            if (recipes.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée pour un temps inférieur à ${maxTime} minutes`);
            }
            return this.mapRecipesFromDB(recipes);
        } catch {
            throw createHttpError(500, `Erreur lors de la recherche de recettes`);
        }
    }
}
