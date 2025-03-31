import { RecipeService } from '../services/recipe.service.ts';
import { FilterRecipeDTO } from '../dtos/recipe/filter-recipe.dto.ts';
import { AddRecipeDTO } from "../dtos/recipe/add-recipe.dto.ts";
import { UpdateRecipeDTO } from "../dtos/recipe/update-recipe.dto.ts";
import { checkId } from "./shared.controller.ts";
import { ErrorObject } from "../models/shared/error.model.ts";
import { RecipeDTO } from '../dtos/recipe/recipe.dto.ts';

export class RecipeController {
    constructor(public recipeService: RecipeService = new RecipeService()) {}

    getAllRecipes = async ({ request, response }: { request: any, response: any }) => {
        const queryParams = new URL(request.url).searchParams;
        
        const filter: FilterRecipeDTO = FilterRecipeDTO.fromRequest(Object.fromEntries(queryParams));
        filter.validate();
        const recipes = await this.recipeService.getRecipes(filter.toModel());
        recipes.map(recipe => RecipeDTO.fromModel(recipe))
        
        response.body = recipes;
        response.status = 200;
    };
    

    getRecipeById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        const recipe = RecipeDTO.fromModel(await this.recipeService.getRecipeById(id));
        response.body = recipe;
        response.status = 200;
    }

    createRecipe = async ({ request, response }: { request: any, response: any }) => {
        try {
            if (request.body.type() !== "form-data") {
                response.status = 400;
                response.body = { error: "Invalid content type. Expected form-data." };
                return;
            }
            const formData = await request.body.formData();
            const recipeData = await AddRecipeDTO.fromFormData(formData);

            recipeData.validate();
            const recipe = RecipeDTO.fromModel(await this.recipeService.createRecipe(recipeData.toModel(), recipeData.image));

            response.body = recipe;
            response.status = 201;
        } catch (error) {
            if (error instanceof ErrorObject) {
                throw error;
            }
            throw new ErrorObject("Internal Server Error", "An error occurred while processing the form data.");
        }
    };

updateRecipe = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    try {
        const id = params.id;
        checkId(id);
        if (request.body.type() !== "form-data") {
            response.status = 400;
            response.body = { error: "Invalid content type. Expected form-data." };
            return;
        }

        const formData = await request.body.formData();
        const updatedRecipeData = await UpdateRecipeDTO.fromFormData(id, formData);

        updatedRecipeData.validate();
        const updatedRecipe = RecipeDTO.fromModel(await this.recipeService.updateRecipe(updatedRecipeData.toModel(), updatedRecipeData.image));

        response.body = updatedRecipe;
        response.status = 200;
    } catch (error) {
        if (error instanceof ErrorObject) {
            throw error;
        }
        throw new ErrorObject("Internal Server Error", "An error occurred while processing the form data.")
    }
};


    deleteRecipe = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        await this.recipeService.deleteRecipe(id);
        response.status = 204;
    }

}