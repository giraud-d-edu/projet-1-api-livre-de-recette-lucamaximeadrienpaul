export class AddIngredientDTO {
    name: string;
    categoriesId: string[];

    constructor(name: string, categoriesId: string[]) {
        this.name = name;
        this.categoriesId = categoriesId;
    }

    static validate(data: AddIngredientDTO): AddIngredientDTO {
        if (!data.name || data.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        return data;
    }
}