import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { CategoryDBO } from "../dbos/categoryDBO.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category.ts";

export class CategoryRepository {

    async getAllCategories(): Promise<Category[]> {
        try {
            const categoriesDBO = await db.getCategoryCollection().find().toArray();
            if (!categoriesDBO) {
                throw createHttpError(404, `Aucune catégorie trouvée`);
            }
            return categoriesDBO.map(categoryDBO => CategoryDBO.toCategory(categoryDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la récupération des catégories : ${error.message}`);
        }
    }

    async getCategoryById(id: string): Promise<Category> {
        try {
            const objectId = new ObjectId(id);
            const categoryDBO = await db.getCategoryCollection().findOne({ _id: objectId });

            if (!categoryDBO) {
                throw createHttpError(404, `Catégorie avec l'ID ${id} non trouvée`);
            }

            return CategoryDBO.toCategory(categoryDBO);
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de la catégorie : ${error.message}`);
        }
    }

    async createCategory(category: Category): Promise<Category> {
        try {
            const categoryDBO = CategoryDBO.fromCategory(category);
            const insertResult = await db.getCategoryCollection().insertOne(categoryDBO);

            if (!insertResult.acknowledged) {
                throw createHttpError(500, 'Échec de l\'insertion de la catégorie');
            }

            return category;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la création de la catégorie : ${error.message}`);
        }
    }

    async updateCategory(id: string, category: Category): Promise<Category> {
        try {
            const objectId = new ObjectId(id);
            const categoryDBO = CategoryDBO.fromCategory(category);

            const updateResult = await db.getCategoryCollection().updateOne( { _id: objectId },{ $set: categoryDBO });

            if (updateResult.matchedCount === 0) {
                throw createHttpError(404, `Catégorie avec l'ID ${id} non trouvée`);
            }
            if (!updateResult.acknowledged) {
                throw createHttpError(500, 'Échec de la mise à jour de la catégorie');
            }
            return category;
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la mise à jour de la catégorie : ${error.message}`);
        }
    }

    async deleteCategory(id: string): Promise<void> {
        try {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getCategoryCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw createHttpError(404, `Catégorie avec l'ID ${id} non trouvée`);
            }
            if (!deleteResult.acknowledged) {
                throw createHttpError(500, 'Échec de la suppression de la catégorie');
            }
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la suppression de la catégorie : ${error.message}`);
        }
    }

    async getCategoryByName(name: string): Promise<Category[]> {
        try {
            const categoriesDBO = await db.getCategoryCollection().find({ name: { $regex: name, $options: "i" } }).toArray();

            if (categoriesDBO.length === 0) {
                throw createHttpError(404, `Aucune catégorie trouvée pour le nom '${name}'`);
            }
            return categoriesDBO.map(categoryDBO => CategoryDBO.toCategory(categoryDBO));
        } catch (error) {
            throw createHttpError(500, `Erreur lors de la recherche de catégorie par nom : ${error.message}`);
        }
    }
}
