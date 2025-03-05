import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { Category } from "../models/category.ts";

export class CategoryDBO {
    id: ObjectId;
    name: string;
    Type: string;

    constructor(id : string, name: string, Type: string) {
        this.id = new ObjectId(id);
        this.name = name;
        this.Type = Type;
    }
    static fromCategory(category: Category): CategoryDBO {
        return new CategoryDBO(category.id, category.name, category.Type);
    }
    static toCategory(categoryDBO: CategoryDBO): Category {
        return {
            id: categoryDBO.id.toString(),
            name: categoryDBO.name,
            Type: categoryDBO.Type,
        };
    }
}