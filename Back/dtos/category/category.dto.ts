import { Category } from "../../models/category.model.ts";

export class CategoryDTO {
    id: string;
    name: string;
    Type: string;

    constructor(id: string, name: string, Type: string) {
        this.id = id;
        this.name = name;
        this.Type = Type;
    }

    static fromModel(model: Category): CategoryDTO {
        return new CategoryDTO(
            model.id,
            model.name,
            model.Type
        );
    }
}
