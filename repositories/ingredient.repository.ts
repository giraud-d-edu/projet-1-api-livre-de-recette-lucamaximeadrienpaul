import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { IngredientDBO } from "../dbos/ingredient.dbo.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Ingredient } from "../models/ingredient.model.ts";

export class IngredientRepository {

    private mapIngredientsFromDB(ingredientsDBO: IngredientDBO[]): Ingredient[] {
        return ingredientsDBO.map(ingredientDBO => IngredientDBO.toIngredient(ingredientDBO));
    }

    async getAllIngredients(sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const ingredientsDBO = await db.getIngredientsCollection().find().sort(sort).toArray();
            if (ingredientsDBO.length === 0) {
                throw createHttpError(404, `Aucun ingrédient trouvé`);
            }
            return this.mapIngredientsFromDB(ingredientsDBO);
    }

    // Modification de getIngredientById pour n'avoir pas de tri (pas nécessaire ici)
    async getIngredientById(id: string): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            const ingredientDBO = await db.getIngredientsCollection().findOne({ _id: objectId });

            if (!ingredientDBO) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }

            return IngredientDBO.toIngredient(ingredientDBO);
    }

    async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);
            const insertResult = await db.getIngredientsCollection().insertOne(ingredientDBO);

            if (!insertResult) {
                throw createHttpError(500, 'Échec de l\'insertion de l\'ingrédient');
            }

            ingredientDBO._id = insertResult;
            return IngredientDBO.toIngredient(ingredientDBO);
    }

    async updateIngredient(id: string, ingredient: Ingredient): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);

            const updateResult = await db.getIngredientsCollection().updateOne({ _id: objectId }, { $set: ingredientDBO });

            if (updateResult.matchedCount === 0) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }
            if (!updateResult) {
                throw createHttpError(500, 'Échec de la mise à jour de l\'ingrédient');
            }
            return ingredient;
    }

    async deleteIngredient(id: string): Promise<void> {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getIngredientsCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw createHttpError(404, `Ingrédient avec l'ID ${id} non trouvé`);
            }
            if (!deleteResult) {
                throw createHttpError(500, 'Échec de la suppression de l\'ingrédient');
            }
    }

    async getIngredientsByCategories(categoryIds: string[], sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const categoryObjectIds = categoryIds.map(id => new ObjectId(id));

            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ categoriesId: { $in: categoryObjectIds } })
                .sort(sort) // Ajout du tri ici
                .toArray();

            if (ingredientsDBO.length === 0) {
                throw createHttpError(404, `Aucun ingrédient trouvé pour les catégories ID '${categoryIds.join(", ")}'`);
            }
            return this.mapIngredientsFromDB(ingredientsDBO);
    }

    async getIngredientsByName(name: string, sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ name: { $regex: name, $options: "i" } })
                .sort(sort)
                .toArray();

            if (ingredientsDBO.length === 0) {
                throw createHttpError(404, `Aucun ingrédient trouvé pour le nom '${name}'`);
            }
            return this.mapIngredientsFromDB(ingredientsDBO);
    }
}
