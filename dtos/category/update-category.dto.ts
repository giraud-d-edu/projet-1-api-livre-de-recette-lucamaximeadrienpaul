export class UpdateCategoryDTO {
    id: string;
    name?: string;
    description?: string;

    constructor(id: string, name?: string, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }
}