import { ErrorObject } from "../models/error.model.ts";
import { IngredientDBO } from "../dbos/ingredient.dbo.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Ingredient } from "../models/ingredient.model.ts";
import { CategoryRepository } from "./category.repository.ts";

export class IngredientRepository {

    private async mapIngredientsFromDB(ingredientsDBO: IngredientDBO[]): Promise<Ingredient[]> {
        const ingredients: Ingredient[] = ingredientsDBO.map(ingredientDBO => IngredientDBO.toIngredient(ingredientDBO));
        const categoryRepository = new CategoryRepository();
        for (const ingredient of ingredients) {
            if (ingredient.categories && Array.isArray(ingredient.categories)) {
                ingredient.categories = await categoryRepository.getCategoriesByIdArray(ingredient.categories as string[]);
            }
        }
        return ingredients;
    }

    private async checkCategories(ingredient: Ingredient): Promise<void> {
        if (ingredient.categories && Array.isArray(ingredient.categories)) {
            for(const categorie of ingredient.categories) {
                const categorieId = typeof categorie === 'string' ? categorie : categorie.id;
                const category = await db.getCategoryCollection().findOne({ _id: new ObjectId(categorieId) });
                if (!category) {
                    throw new ErrorObject('Bad Request', `La catégorie avec l'ID ${categorieId} n'existe pas.`);
                }
            }
        }
    }

    async getAllIngredients(sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const ingredientsDBO = await db.getIngredientsCollection().find().sort(sort).toArray();
            return await this.mapIngredientsFromDB(ingredientsDBO);
    }
    async getIngredientById(id: string): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            const ingredientDBO = await db.getIngredientsCollection().findOne({ _id: objectId });

            if (!ingredientDBO) {
                throw new ErrorObject('Bad Request',  `Ingrédient avec l'ID ${id} non trouvé`);
            }

            return (await this.mapIngredientsFromDB([ingredientDBO]))[0];
    }
    async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        await this.checkCategories(ingredient);
        const ingredientDBO = IngredientDBO.fromIngredient(ingredient);
        const insertResult = await db.getIngredientsCollection().insertOne(ingredientDBO);
        if (!insertResult) {
            throw new ErrorObject('Internal Server Error', "Échec de l'insertion de l'ingrédient dans la base de données.");
        }
        return await this.getIngredientById(insertResult.toString());
    }

    async updateIngredient(id: string, ingredient: Ingredient): Promise<Ingredient> {
            const objectId = new ObjectId(id);
            await this.checkCategories(ingredient);
            const ingredientDBO = IngredientDBO.fromIngredient(ingredient);

            const updateResult = await db.getIngredientsCollection().updateOne({ _id: objectId }, { $set: ingredientDBO });

            if (updateResult.matchedCount === 0) {
                throw new ErrorObject('Bad Request',  `Ingrédient avec l'ID ${id} non trouvé`);
            }
            return await this.getIngredientById(id);
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

            return await this.mapIngredientsFromDB(ingredientsDBO);
    }

    async getIngredientsByName(name: string, sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ name: { $regex: name, $options: "i" } })
                .sort(sort)
                .toArray();

            return  await this.mapIngredientsFromDB(ingredientsDBO);
    }

    async getIngredientsByIdArray(ids: string[], sort: { [key: string]: 1 | -1 } = {}): Promise<Ingredient[]> {
            const objectIds = ids.map(id => new ObjectId(id));

            const ingredientsDBO = await db.getIngredientsCollection()
                .find({ _id: { $in: objectIds } })
                .sort(sort)
                .toArray();
                
            return await this.mapIngredientsFromDB(ingredientsDBO);
    }
}
