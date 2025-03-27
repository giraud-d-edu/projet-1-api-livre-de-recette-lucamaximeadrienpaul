import { ErrorObject } from "../../models/error.model.ts";

export class AddRecipeDTO {
    constructor(
        public name: string,
        public ingredientsId: string[],
        public description: string,
        public step: string,
        public categoriesId: string[],
        public time: number,
        public origin?: string,
        public image?: File | null
    ) { }

    validate(): void {
        if (!this.name || this.name.length > 255) {
            throw new ErrorObject('Bad Request', "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        }
        if (!this.ingredientsId || this.ingredientsId.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir au moins un ingrédient.");
        }
        if (!this.description || this.description.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir une description.");
        }
        if (!this.step || this.step.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir une étape.");
        }
        if (!this.categoriesId || this.categoriesId.length === 0) {
            throw new ErrorObject('Bad Request', "La recette doit contenir au moins une catégorie.");
        }
        if (!this.time || this.time < 0) {
            throw new ErrorObject('Bad Request', "Le temps de préparation doit être positif.");
        }
        if (this.categoriesId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Bad Request', `Les id des catégories doivent être une chaîne de 24 caractères hexadécimaux`);
        }
        if (this.ingredientsId?.some(id => !/^[0-9a-fA-F]{24}$/.test(id))) {
            throw new ErrorObject('Bad Request', `Les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux`);
        }
        if (this.image && !/(png|jpeg|jpg|gif|webp|bmp)/.test(this.image.type)) {
            throw new ErrorObject('Bad Request', `Le fichier image doit être de type png, jpg, gif, webp ou bmp`);
        }
    }

    static async fromFormData(formData: FormData): Promise<AddRecipeDTO> {
        return new AddRecipeDTO(
            formData.get("name") as string,
            formData.getAll("ingredientsId") as string[],
            formData.get("description") as string,
            formData.get("step") as string,
            formData.getAll("categoriesId") as string[],
            Number(formData.get("time")),
            formData.get("origin") as string | undefined,
            formData.get("image") instanceof File ? (formData.get("image") as File) : null
        );
    }
}
