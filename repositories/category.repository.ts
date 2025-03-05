import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";
import { CategoryDBO } from "../dbos/category.dbo.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category.model.ts";

export class CategoryRepository {

    private mapCategoriesFromDB(categoriesDBO: CategoryDBO[]): Category[] {
        return categoriesDBO.map(categoryDBO => CategoryDBO.toCategory(categoryDBO));
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            const categoriesDBO = await db.getCategoryCollection().find().toArray();
            if (categoriesDBO.length === 0) {
                throw createHttpError(404, `Aucune catégorie trouvée`);
            }
            return this.mapCategoriesFromDB(categoriesDBO);
        } catch  {
            throw new Error(500, `Erreur lors de la récupération des catégories`);
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
        } catch {
            throw new Error(500, `Erreur lors de la recherche de la catégorie`);
        }
    }

    async createCategory(category: Category): Promise<Category> {
        try {
            const categoryDBO = CategoryDBO.fromCategory(category);
            const insertResult = await db.getCategoryCollection().insertOne(categoryDBO);

            if (!insertResult) {
                throw new Error(500, 'Échec de l\'insertion de la catégorie');
            }

            categoryDBO._id = insertResult;
            return CategoryDBO.toCategory(categoryDBO);
        } catch {
            throw new Error(500, `Erreur lors de la création de la catégorie`);
        }
    }

    async updateCategory(id: string, category: Category): Promise<Category> {
        try {
            const objectId = new ObjectId(id);
            const categoryDBO = CategoryDBO.fromCategory(category);

            const updateResult = await db.getCategoryCollection().updateOne({ _id: objectId }, { $set: categoryDBO });

            if (updateResult.matchedCount === 0) {
                throw createHttpError(404, `Catégorie avec l'ID ${id} non trouvée`);
            }
            if (!updateResult) {
                throw new Error(500, 'Échec de la mise à jour de la catégorie');
            }
            return CategoryDBO.toCategory(categoryDBO);
        } catch{
            throw new Error(500, `Erreur lors de la mise à jour de la catégorie`);
        }
    }

    async deleteCategory(id: string): Promise<void> {
        try {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getCategoryCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw createHttpError(404, `Catégorie avec l'ID ${id} non trouvée`);
            }
            if (!deleteResult) {
                throw new Error(500, 'Échec de la suppression de la catégorie');
            }
        } catch {
            throw new Error(500, `Erreur lors de la suppression de la catégorie`);
        }
    }

    async getCategoryByName(name: string): Promise<Category[]> {
        try {
            const categoriesDBO = await db.getCategoryCollection().find({ name: { $regex: name, $options: "i" } }).toArray();

            if (categoriesDBO.length === 0) {
                throw createHttpError(404, `Aucune catégorie trouvée pour le nom '${name}'`);
            }
            return this.mapCategoriesFromDB(categoriesDBO);
        } catch {
         throw new Error(500, `Erreur lors de la recherche de catégorie par nom`);
        }
    }
}
