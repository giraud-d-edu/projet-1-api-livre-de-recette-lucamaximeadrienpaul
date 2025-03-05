import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { IngredientDBO } from "../dbos/ingredientDBO.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Ingredient } from "../models/ingredient.ts";

export class IngredientRepository {

    async getAllIngredients(): Promise<Ingredient[]> {
        try {
            const ingredientsDBO = await db.getIngredientsCollection().find().toArray();
            if (!ingredientsDBO) {
                throw createHttpError(404, `Aucun ingrédient trouvé`);
            }
            return ingredientsDBO.map(ingredientDBO => IngredientDBO.toIngredient(ingredientDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la récupération des ingrédients : ${error.message}`);
        }
    }

    async getIngredientById(id: string): Promise<Ingredient> {
        try {
            const objectId = new ObjectId(id);
            const ingredientDBO = await db.getIngredientsCollection().findOne({ _id: objectId });

            if (!ingredientDBO) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }

            return IngredientDBO.toIngredient(ingredientDBO);
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de l'ingrédient : ${error.message}`);
        }
    }
    async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        try {
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);
            const insertResult = await db.getIngredientsCollection().insertOne(ingredientDBO);

            if (!insertResult.acknowledged) {
                throw new Error(500,'Échec de l\'insertion de l\'ingrédient');
            }

            return ingredient;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la création de l'ingrédient : ${error.message}`);
        }
    }
    async updateIngredient(id: string, ingredient: Ingredient): Promise<Ingredient> {
        try {
            const objectId = new ObjectId(id);
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);

            const updateResult = await db.getIngredientsCollection().updateOne( { _id: objectId },{ $set: ingredientDBO });

            if (updateResult.matchedCount === 0) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }
            if (!updateResult.acknowledged) {
                throw new Error(500,'Échec de la mise à jour de l\'ingrédient');
            }
            return ingredient;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la mise à jour de l'ingrédient : ${error.message}`);
        }
    }
    async deleteIngredient(id: string): Promise<void> {
        try {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getIngredientsCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }
            if (!deleteResult.acknowledged) {
                throw new Error(500,'Échec de la suppression de l\'ingrédient');
            }
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la suppression de l'ingrédient : ${error.message}`);
        }
    }
    async getIngredientsByCategories(categoryIds: string[]): Promise<Ingredient[]> {
        try {
            const categoryObjectIds = categoryIds.map(id => new ObjectId(id));

            const ingredientsDBO = await db.getIngredientsCollection().find({ categoriesId: { $in: categoryObjectIds } }).toArray();
            if (ingredientsDBO.length === 0) {
                throw createHttpError(404, `Aucune recette trouvée pour les catégories ID '${categoryIds.join(", ")}'`);
            }
            return ingredientsDBO.map(ingredientDBO => IngredientDBO.toIngredient(ingredientDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche des ingrédients par catégories : ${error.message}`);
        }
    }

    async getIngredientsByName(name: string): Promise<Ingredient[]> {
        try {
            const ingredientsDBO = await db.getIngredientsCollection().find({ name: { $regex: name, $options: "i" } }).toArray();
            if (ingredientsDBO.length === 0) {
                throw createHttpError(404, `Aucun ingrédient trouvé pour le nom '${name}'`);
            }
            return ingredientsDBO.map(ingredientDBO => IngredientDBO.toIngredient(ingredientDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche des ingrédients par nom : ${error.message}`);
        }
    }
}
