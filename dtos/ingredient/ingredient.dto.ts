export class IngredientDTO {
    name: string;
    quantity: number;

    constructor(name: string, quantity: number) {
        this.name = name;
        this.quantity = quantity;
    }
}

export function validateIngredientDTO(data: IngredientDTO): IngredientDTO {
    if (!data.name || data.name.length > 255) {
        throw new Error("Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    }
    if (data.quantity <= 0) {
        throw new Error("La quantité doit être supérieure à zéro.");
    }
    return data;
}