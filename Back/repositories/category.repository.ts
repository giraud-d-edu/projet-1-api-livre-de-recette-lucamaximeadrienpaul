import { ErrorObject } from "../models/shared/error.model.ts";
import { CategoryDBO } from "../dbos/category.dbo.ts";
import { db } from "../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category/category.model.ts";
import { FilterCategory } from "../models/category/filter-category.model.ts";

export class CategoryRepository {

    private mapCategoriesFromDB(categoriesDBO: CategoryDBO[]): Category[] {
        return categoriesDBO.map(categoryDBO => CategoryDBO.toCategory(categoryDBO));
    }

    private buildQuery(filters: FilterCategory): { [key: string]: any } {
        const query: { [key: string]: any } = {};
        if (filters.type) {
            query.Type = { $regex: filters.type, $options: "i" };
        }
        if (filters.name) {
            query.name = { $regex: filters.name, $options: "i" };
        }
        return query;
    }

    async getAllCategories(filter?: FilterCategory, sort: { [key: string]: 1 | -1 } = {}): Promise<Category[]> {
        const filterQuerry = this.buildQuery(filter || {});
        const categoriesDBO = await db.getCategoryCollection().find(filterQuerry).sort(sort).toArray();
        return this.mapCategoriesFromDB(categoriesDBO);
    }

    async getCategoryById(id: string): Promise<Category> {
            const objectId = new ObjectId(id);
            const categoryDBO = await db.getCategoryCollection().findOne({ _id: objectId });

            if (!categoryDBO) {
                throw new ErrorObject('Not Found',  `Catégorie avec l'ID ${id} non trouvée`);
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
                throw new ErrorObject('Not Found',  `Catégorie avec l'ID ${id} non trouvée`);
            }
            return CategoryDBO.toCategory(categoryDBO);
    }

    async deleteCategory(id: string): Promise<void> {
            const objectId = new ObjectId(id);

            const deleteResult = await db.getCategoryCollection().deleteOne({ _id: objectId });

            if (deleteResult.deletedCount === 0) {
                throw new ErrorObject('Not Found',  `Catégorie avec l'ID ${id} non trouvée`);
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
