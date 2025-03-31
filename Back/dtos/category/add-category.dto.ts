import { Category } from "../../models/category/category.model.ts";
import { ErrorObject } from "../../models/shared/error.model.ts";

export class AddCategoryDTO {
    name: string;
    Type: string;

    constructor(name: string, Type: string) {
        this.name = name;
        this.Type = Type;
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new ErrorObject('Not Found', "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!this.Type || this.Type.length > 255) {
            throw new ErrorObject('Not Found', "Le Type ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }

    static fromRequest(data: any): AddCategoryDTO {
        return new AddCategoryDTO(
            data.name,
            data.Type
        );
    }

    toModel(): Category {
        return {
            id: "",
            name: this.name,
            Type: this.Type
        };
    }

}