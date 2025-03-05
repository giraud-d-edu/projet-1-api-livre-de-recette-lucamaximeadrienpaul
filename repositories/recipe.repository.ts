import { Recipe } from "../models/recipe.model.ts";
import { RecipeDBO } from "../dbos/recipe.dbo.ts";
import { db } from "../db.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
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
            return recipes.map(recipeDBO => RecipeDBO.toRecipe(recipeDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la récupération des recettes: ${error.message}`);
        }
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
    }

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            const recipeD = RecipeDBO.fromRecipe(recipe);
            const insertResult = await db.getRecipesCollection().insertOne(recipeD);

            if (!insertResult.acknowledged) {
                throw new Error(500,'Échec de l\'insertion de la recette dans la base de données.');
            }

            return recipe;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la création de la recette: ${error.message}`);
        }
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
