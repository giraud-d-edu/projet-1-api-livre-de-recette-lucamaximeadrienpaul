import { ErrorObject } from "../../models/shared/error.model.ts";
import { Recipe } from "../../models/recipe/recipe.model.ts";

export class UpdateRecipeDTO {
    id: string;
    name?: string;
    ingredientsId?: string[];
    description?: string;
    step?: string;
    categoriesId?: string[];
    time?: number;
    origin?: string;
    image?: File | null;

    constructor(
        id: string,
        name?: string,
        ingredientsId?: string[],
        description?: string,
        step?: string,
        categoriesId?: string[],
        time?: number,
        origin?: string,
        image: File | null = null
    ) {
        this.id = id;
        this.name = name;
        this.ingredientsId = ingredientsId;
        this.description = description;
        this.step = step;
        this.categoriesId = categoriesId;
        this.time = time;
        this.origin = origin;
        this.image = image;
    }

    validate(): void {
        if (this.name && this.name.length > 255) {
            throw new ErrorObject('Bad Request', "Le nom ne doit pas excéder 255 caractères.");
        }
        if (this.ingredientsId && this.ingredientsId.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir au moins un ingrédient.");
        }
        if (this.description && this.description.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir une description.");
        }
        if (this.step && this.step.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir une étape.");
        }
        if (this.categoriesId && this.categoriesId.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir au moins une catégorie.");
        }
        if (this.time && this.time < 0) {
            throw new ErrorObject('Bad Request', "Le temps de préparation doit être positif.");
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Bad Request', `Les id des catégories doivent être une chaîne de 24 caractères hexadécimaux.`);
        }
        if (this.ingredientsId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Bad Request', `Les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux.`);
        }
        if (this.image && !/(png|jpeg|jpg|gif|webp|bmp)/.test(this.image.type)) {
            throw new ErrorObject('Bad Request', `Le fichier image doit être de type png, jpg, gif, webp ou bmp`);
        }
    }

    static async fromFormData(id: string, formData: FormData): Promise<UpdateRecipeDTO> {
        return new UpdateRecipeDTO(
            id,
            formData.get("name") as string | undefined,
            formData.getAll("ingredientsId") as string[],
            formData.get("description") as string | undefined,
            formData.get("step") as string | undefined,
            formData.getAll("categoriesId") as string[],
            formData.get("time") ? Number(formData.get("time")) : undefined,
            formData.get("origin") as string | undefined,
            formData.get("image") instanceof File ? (formData.get("image") as File) : null
        );
    }

    toModel(): Recipe {
        return {
            id: this.id,
            name: this.name || '',
            ingredients: this.ingredientsId || [],
            description: this.description || '',
            step: this.step || '',
            categories: this.categoriesId || [],
            time: this.time || -1,
            origin: this.origin || '',
            image: null
        };
    }
}
