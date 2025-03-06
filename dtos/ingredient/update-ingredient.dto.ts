export class UpdateIngredientDTO {
    id: string;
    name?: string;
    categoriesId?: string[];

    constructor(id: string, name?: string, categoriesId?: string[]) {
        this.id = id;
        this.name = name;
        this.categoriesId = categoriesId;
    }

    validate(): void {
        if (this.name && this.name.length > 255) {
            throw new Error("Le nom ne doit pas excéder 255 caractères.");
        }
    }
}