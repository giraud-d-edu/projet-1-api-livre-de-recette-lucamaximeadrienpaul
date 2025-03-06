import {RecipeService} from '../services/recipe.service.ts';
import {AddRecipeDTO, UpdateRecipeDTO, RecipeDTO} from '../dtos/recipe.dto.ts';
import {FilterRecipeDTO}    from '../dtos/recipe/filter-recipe.dto.ts';
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";


const recipeService = new RecipeService();


export class recipeController {

    static getAllRecipes(ctx: Context) {
        const body : FilterRecipeDTO = FilterRecipeDTO.fromRequest(ctx.request.body.json());
        body.validate();
        const recipe : RecipeDTO = RecipeService.getRecipes(body);
        ctx.response.body = recipe;
        ctx.response.status = 200;
        
    }

    static getRecipeById(ctx: Context) {
        const id = ctx.params.id;
        const recipe : RecipeDTO = RecipeService.getRecipeById(id);
        ctx.response.body = recipe;
        ctx.response.status = 200;
    }

    static async createRecipe(ctx: Context) {
        const body : AddRecipeDTO = await ctx.request.body.json();
        body.validate();
        const recipe : AddRecipeDTO = recipeService.createRecipe(body);
        ctx.response.body = recipe;
        ctx.response.status = 201;
    }

    static async updateRecipe(ctx: Context) {
        const id = ctx.params.id;
        const body : UpdateRecipeDTO = await ctx.request.body.json();
        body.validate();
        const recipe : UpdateRecipeDTO = recipeService.updateRecipe(id, body);
        ctx.response.body = recipe;
        ctx.response.status = 200;
    }

    static deleteRecipe(ctx: Context) {
        const id = ctx.params.id;
        recipeService.deleteRecipe(id);
        ctx.response.status = 204;
    }

}