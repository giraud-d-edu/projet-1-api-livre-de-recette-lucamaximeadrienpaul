import { Category } from "../../models/category/category.model.ts";
import { ErrorObject } from "../../models/shared/error.model.ts";

export class UpdateCategoryDTO {
    id: string;
    name?: string;
    Type?: string;

    constructor(id: string, name?: string, Type?: string) {
        this.id = id;
        this.name = name;
        this.Type = Type;
    }

    validate(): void {
        if (this.name && this.name.length > 255) {
            throw new ErrorObject('Bad Request', "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (this.Type && this.Type.length > 255) {
            throw new ErrorObject('Bad Request', "Le Type ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }

    static fromRequest(data: any): UpdateCategoryDTO {
        return new UpdateCategoryDTO(
            data.id,
            data.name,
            data.Type
        );
    }

    toModel(): Category {
        return {
            id: this.id,
            name: this.name || "",
            Type: this.Type || ""
        };
    }
}