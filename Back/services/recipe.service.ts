import { Recipe } from '../models/recipe/recipe.model.ts';
import { RecipeRepository } from './../repositories/recipe.repository.ts';
import { ImageRepository } from './../repositories/image.repository.ts';
import { ErrorObject } from "../models/shared/error.model.ts";
import { FilterRecipe } from '../models/recipe/recipe-filter.model.ts';

export class RecipeService {

    private readonly recipeRepository: RecipeRepository = new RecipeRepository();
    private readonly ImageRepository: ImageRepository = new ImageRepository();

    async getRecipes(filters: FilterRecipe): Promise<Recipe[]> {
        return await this.recipeRepository.getRecipes(filters)
    }

    async getRecipeById(id: string): Promise<Recipe> {
        return await this.recipeRepository.getRecipeById(id)
    }

    async createRecipe(recipe: Recipe, image?: File|null): Promise<Recipe> {
        if (image) {
            try {
                const imagePath = await this.ImageRepository.uploadImage(image);
                recipe.image = imagePath;
            } catch (err) {
                throw new ErrorObject("Internal Server Error", "Erreur lors de l\'upload de l\'image : " + err);
            }
        }
        return await this.recipeRepository.createRecipe(recipe);
    }

    async updateRecipe(recipe: Recipe, image?: File|null): Promise<Recipe> {
        let recipeModel = await this.recipeRepository.getRecipeById(recipe.id);
    
        if (image) {
                recipeModel.image = await this.ImageRepository.uploadImage(image);
        }
    
        recipeModel = {
            id: recipeModel.id,
            name: recipe.name || recipeModel.name,
            ingredients: recipe.ingredients || recipeModel.ingredients,
            description: recipe.description || recipeModel.description,
            step: recipe.step || recipeModel.step,
            categories: recipe.categories || recipeModel.categories,
            time: recipe.time == -1 ? recipe.time : recipeModel.time,
            origin: recipe.origin || recipeModel.origin,
            image: recipeModel.image
        };
        return await this.recipeRepository.updateRecipe(recipe.id, recipeModel);
    }

    async deleteRecipe(id: string): Promise<void> {
        return await this.recipeRepository.deleteRecipe(id)
    }
}