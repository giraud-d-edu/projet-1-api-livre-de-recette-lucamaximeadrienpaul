export class AddIngredientDTO {
    name: string;
    categoriesId: string[];

    constructor(name: string, categoriesId: string[]) {
        this.name = name;
        this.categoriesId = categoriesId;
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }
}