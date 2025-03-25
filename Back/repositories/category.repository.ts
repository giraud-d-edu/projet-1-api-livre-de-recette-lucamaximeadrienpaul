import { ErrorObject } from "../models/error.model.ts";
import { CategoryDBO } from "../dbos/category.dbo.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category.model.ts";

export class CategoryRepository {

    private mapCategoriesFromDB(categoriesDBO: CategoryDBO[]): Category[] {
        return categoriesDBO.map(categoryDBO => CategoryDBO.toCategory(categoryDBO));
    }

    async getAllCategories(type?: string, sort: { [key: string]: 1 | -1 } = {}): Promise<Category[]> {
        const filter: any = type ? { Type: type } : {}; 
        const categoriesDBO = await db.getCategoryCollection().find(filter).sort(sort).toArray();
        return this.mapCategoriesFromDB(categoriesDBO);
    }

    async getCategoryByName(name: string, type?: string, sort: { [key: string]: 1 | -1 } = {}): Promise<Category[]> {
        const filter: any = { name: { $regex: name, $options: "i" } };
        if (type) filter.Type = type;
        const categoriesDBO = await db.getCategoryCollection()
            .find(filter)
            .sort(sort)
            .toArray();
    
        if (categoriesDBO.length === 0) {
            throw new ErrorObject('Bad Request', `Aucune catégorie trouvée pour le nom '${name}' et le type '${type || "tous"}'`);
        }
        return this.mapCategoriesFromDB(categoriesDBO);
    }

    async getCategoryById(id: string): Promise<Category> {
            const objectId = new ObjectId(id);
            const categoryDBO = await db.getCategoryCollection().findOne({ _id: objectId });

            if (!categoryDBO) {
                throw new ErrorObject('Bad Request',  `Catégorie avec l'ID ${id} non trouvée`);
            }

            return CategoryDBO.toCategory(categoryDBO);
    }

    async createCategory(category: Category): Promise<Category> {
            const categoryDBO = CategoryDBO.fromCategory(category);
            const insertResult = await db.getCategoryCollection().insertOne(categoryDBO);

            categoryDBO._id = insertResult;
            return CategoryDBO.toCategory(categoryDBO);
    }

    async updateCategory(id: string, category: Category): Promise<Category> {
            const objectId = new ObjectId(id);
            const categoryDBO = CategoryDBO.fromCategory(category);

            const updateResult = await db.getCategoryCollection().updateOne({ _id: objectId }, { $set: categoryDBO });

            if (updateResult.matchedCount === 0) {
                throw new ErrorObject('Bad Request',  `Catégorie avec l'ID ${id} non trouvée`);
            }
            return CategoryDBO.toCategory(categoryDBO);
    }

    async deleteCategory(id: string): Promise<void> {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getCategoryCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw new ErrorObject('Bad Request',  `Catégorie avec l'ID ${id} non trouvée`);
            }
    }

    async getCategoriesByIdArray(ids: string[], sort: { [key: string]: 1 | -1 } = {}): Promise<Category[]> {
            const objectIds = ids.map(id => new ObjectId(id));

            const categoriesDBO = await db.getCategoryCollection()
                .find({ _id: { $in: objectIds } })
                .sort(sort)
                .toArray();
            return this.mapCategoriesFromDB(categoriesDBO);
    }
}
