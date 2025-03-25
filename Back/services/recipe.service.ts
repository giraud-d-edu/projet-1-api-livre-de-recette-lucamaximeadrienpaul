import { Recipe } from '../models/recipe.model.ts';
import { AddRecipeDTO } from "../dtos/recipe/add-recipe.dto.ts";
import { RecipeDTO } from "../dtos/recipe/recipe.dto.ts";
import { UpdateRecipeDTO } from "../dtos/recipe/update-recipe.dto.ts";
import { FilterRecipeDTO } from './../dtos/recipe/filter-recipe.dto.ts';
import { RecipeRepository } from './../repositories/recipe.repository.ts';
import { ImageRepository } from './../repositories/image.repository.ts';
import { ErrorObject } from "../models/error.model.ts";

export class RecipeService {

    private readonly recipeRepository: RecipeRepository = new RecipeRepository();
    private readonly ImageRepository: ImageRepository = new ImageRepository();

    async getRecipes(filtersDto: FilterRecipeDTO): Promise<RecipeDTO[]> {
        const filters: { name?: string, categoriesId?: string[], ingredientId?: string[], time?: number } = {}
        if (filtersDto.name) filters.name = filtersDto.name
        if (filtersDto.categoriesId) filters.categoriesId = filtersDto.categoriesId
        if (filtersDto.ingredientId) filters.ingredientId = filtersDto.ingredientId
        if (filtersDto.time) filters.time = filtersDto.time

        const recipes = await this.recipeRepository.getRecipes(filters)
        return recipes.map(recipe => RecipeDTO.fromModel(recipe))
    }

    async getRecipeById(id: string): Promise<RecipeDTO> {
        const recipe = await this.recipeRepository.getRecipeById(id)
        return RecipeDTO.fromModel(recipe)
    }

    async createRecipe(recipe: AddRecipeDTO): Promise<RecipeDTO> {
        let recipeModel: Recipe = {
            id: '',
            name: recipe.name,
            ingredients: recipe.ingredientsId,
            description: recipe.description,
            step: recipe.step,
            categories: recipe.categoriesId,
            time: recipe.time,
            origin: recipe.origin || '',
            image: '',
        };

        if (recipe.image) {
            try {
                const imagePath = await this.ImageRepository.uploadImage(recipe.image);
                recipeModel.image = imagePath;
            } catch (err) {
                throw new ErrorObject("Internal Server Error", "Erreur lors de l\'upload de l\'image : " + err);
            }
        }
        recipeModel = await this.recipeRepository.createRecipe(recipeModel);

        return RecipeDTO.fromModel(recipeModel);
    }

    async updateRecipe(recipe: UpdateRecipeDTO): Promise<RecipeDTO> {
        let recipeModel = await this.recipeRepository.getRecipeById(recipe.id);
    
        if (recipe.image) {
                const imagePath = await this.ImageRepository.uploadImage(recipe.image);
                recipeModel.image = imagePath;
        }
    
        recipeModel = {
            id: recipe.id,
            name: recipe.name || recipeModel.name,
            ingredients: recipe.ingredientsId || recipeModel.ingredients,
            description: recipe.description || recipeModel.description,
            step: recipe.step || recipeModel.step,
            categories: recipe.categoriesId || recipeModel.categories,
            time: recipe.time || recipeModel.time,
            origin: recipe.origin || recipeModel.origin,
            image: recipeModel.image
        };
        recipeModel = await this.recipeRepository.updateRecipe(recipe.id, recipeModel);
        return RecipeDTO.fromModel(recipeModel);
    }

    async deleteRecipe(id: string): Promise<void> {
        return await this.recipeRepository.deleteRecipe(id)
    }
}