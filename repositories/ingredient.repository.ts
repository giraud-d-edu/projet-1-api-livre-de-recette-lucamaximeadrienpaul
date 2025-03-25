import { ErrorObject } from "../models/error.model.ts";
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
            return this.mapIngredientsFromDB(ingredientsDBO);
    }
    async getIngredientById(id: string): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            const ingredientDBO = await db.getIngredientsCollection().findOne({ _id: objectId });

            if (!ingredientDBO) {
                throw new ErrorObject('Bad Request',  `Ingrédient avec l'ID ${id} non trouvé`);
            }

            return IngredientDBO.toIngredient(ingredientDBO);
    }
    async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        if (ingredient.categoriesId && Array.isArray(ingredient.categoriesId)) {
            for(const catId of ingredient.categoriesId) {
                const category = await db.getCategoryCollection().findOne({ _id: new ObjectId(catId) });
                if (!category) {
                    throw new ErrorObject('Bad Request', `La catégorie avec l'ID ${catId} n'existe pas.`);
                }
            }
        }
        const ingredientDBO = IngredientDBO.fromIngredient(ingredient);
        const insertResult = await db.getIngredientsCollection().insertOne(ingredientDBO);
        if (!insertResult) {
            throw new ErrorObject('Internal Server Error', "Échec de l'insertion de l'ingrédient dans la base de données.");
        }
        ingredientDBO._id = insertResult;
        return IngredientDBO.toIngredient(ingredientDBO);
    }

    async updateIngredient(id: string, ingredient: Ingredient): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);

            const updateResult = await db.getIngredientsCollection().updateOne({ _id: objectId }, { $set: ingredientDBO });

            if (updateResult.matchedCount === 0) {
                throw new ErrorObject('Bad Request',  `Ingrédient avec l'ID ${id} non trouvé`);
            }
            return ingredient;
    }

    async deleteIngredient(id: string): Promise<void> {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getIngredientsCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw new ErrorObject('Bad Request',  `Ingrédient avec l'ID ${id} non trouvé`);
            }
    }

    async getIngredientsByCategories(categoryIds: string[], sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const categoryObjectIds = categoryIds.map(id => new ObjectId(id));

            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ categoriesId: { $in: categoryObjectIds } })
                .sort(sort)
                .toArray();

            if (ingredientsDBO.length === 0) {
                throw new ErrorObject('Bad Request',  `Aucun ingrédient trouvé pour les catégories ID '${categoryIds.join(", ")}'`);
            }
            return this.mapIngredientsFromDB(ingredientsDBO);
    }

    async getIngredientsByName(name: string, sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ name: { $regex: name, $options: "i" } })
                .sort(sort)
                .toArray();

            if (ingredientsDBO.length === 0) {
                throw new ErrorObject('Bad Request',  `Aucun ingrédient trouvé pour le nom '${name}'`);
            }
            return this.mapIngredientsFromDB(ingredientsDBO);
    }
}
