import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category.ts";

export class CategoryDBO {
    _id: ObjectId | null;
    name: string;
    Type: string;

    constructor(id : string |null, name: string, Type: string) {
        this._id = new ObjectId(id);
        this.name = name;
        this.Type = Type;
    }
    static fromCategory(category: Category): CategoryDBO {
        return new CategoryDBO(category.id, category.name, category.Type);
    }
    static toCategory(categoryDBO: CategoryDBO): Category {
        return {
            id: categoryDBO._id!.toString(),
            name: categoryDBO.name,
            Type: categoryDBO.Type,
        };
    }
}