import { FilterCategory } from "../../models/category/filter-category.model.ts";
import { ErrorObject } from "../../models/shared/error.model.ts";

export class FilterCategoryDTO {
    constructor(
        public type: string | null,
        public name: string | null,
    ) {}

    public static fromRequest(data: any): FilterCategoryDTO {
        return new FilterCategoryDTO(
            data.type || null,
            data.name || null,
        );
    }

    public validate(): void {
        if (this.type !== null && typeof this.type !== "string") {
            throw new ErrorObject('Bad Request', `Le type de catégorie doit être une chaîne de caractères valide.`);
        }
    }

    public toModel(): FilterCategory {
        return {
            type: this.type || undefined,
            name: this.name || undefined,
        };
    }
}
