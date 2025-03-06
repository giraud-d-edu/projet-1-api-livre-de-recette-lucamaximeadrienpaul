import { createHttpError } from 'https://deno.land/x/oak@v17.1.4/deps.ts';
export class AddCategoryDTO {
    name: string;
    Type: string;

    constructor(name: string, Type: string) {
        this.name = name;
        this.Type = Type;
    }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw createHttpError(400, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!this.Type || this.Type.length > 255) {
            throw createHttpError(400, "Le Type ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
    }

    static fromRequest(data: any): AddCategoryDTO {
        return new AddCategoryDTO(
            data.name,
            data.Type
        );
    }
}