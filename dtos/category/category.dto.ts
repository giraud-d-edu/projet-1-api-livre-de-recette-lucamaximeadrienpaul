export class CategoryDTO {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export function validateCategoryDTO(data: CategoryDTO): CategoryDTO {
    if (!data.name || data.name.length > 255) {
        throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    }
    return data;
}