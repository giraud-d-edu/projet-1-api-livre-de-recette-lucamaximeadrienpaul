import { RecipeService } from '../services/recipe.service.ts';
import { FilterRecipeDTO } from '../dtos/recipe/filter-recipe.dto.ts';
import { AddRecipeDTO } from "../dtos/recipe/add-recipe.dto.ts";
import { UpdateRecipeDTO } from "../dtos/recipe/update-recipe.dto.ts";

export class RecipeController {

    private readonly recipeService: RecipeService = new RecipeService();

    getAllRecipes = async ({ request, response }: { request: any, response: any }) => {
        const queryParams = new URL(request.url).searchParams;
        
        const filter: FilterRecipeDTO = FilterRecipeDTO.fromRequest(Object.fromEntries(queryParams));
        filter.validate();
        const recipe = await this.recipeService.getRecipes(filter);
        
        response.body = recipe;
        response.status = 200;
    };
    

    getRecipeById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        const recipe = await this.recipeService.getRecipeById(id);
        response.body = recipe;
        response.status = 200;
    }

    createRecipe = async ({ request, response }: { request: any, response: any }) => {
        const body = AddRecipeDTO.fromRequest(await request.body.json());
        body.validate();
        const recipe = await this.recipeService.createRecipe(body);
        response.body = recipe;
        response.status = 201;
    }

    updateRecipe = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const id = params.id;
        const body = UpdateRecipeDTO.fromRequest(await request.body.json());
        body.id = id;
        body.validate();
        const recipe = await this.recipeService.updateRecipe(body);
        response.body = recipe;
        response.status = 200;
    }

    deleteRecipe = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        await this.recipeService.deleteRecipe(id);
        response.status = 204;
    }

}