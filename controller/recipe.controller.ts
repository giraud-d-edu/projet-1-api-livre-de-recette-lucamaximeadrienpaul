import {RecipeService} from '../servicesTEMP/recipe.service.ts';
import {AddRecipeDTO, UpdateRecipeDTO, RecipeDTO} from '../dtos/recipe.dto.ts';
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";


const recipeService = new RecipeService();


export class recipeController {

    static getAllRecipes(ctx: Context) {
        const recipe : RecipeDTO = RecipeService.getAllRecipes();
        ctx.response.body = recipe;
        
    }

    static getRecipeById(ctx: Context) {
        const id = ctx.params.id;
        const recipe : RecipeDTO = RecipeService.getRecipeById(id);
        ctx.response.body = recipe;
    }

    static async createRecipe(ctx: Context) {
        const body : AddRecipeDTO = await ctx.request.body.json();
        const dataValidate = AddRecipeDTO.validate(body);
        if(!dataValidate) {
            return
        }
        const recipe : AddRecipeDTO = recipeService.createRecipe(body);
        ctx.response.body = recipe;
    }

    static async updateRecipe(ctx: Context) {
        const id = ctx.params.id;
        const body : UpdateRecipeDTO = await ctx.request.body.json();
        const dataValidate = UpdateRecipeDTO.validate(body);
        if(!dataValidate) {
            return
        }
        const recipe : UpdateRecipeDTO = recipeService.updateRecipe(id, body);
        ctx.response.body = recipe;
    }

    static deleteRecipe(ctx: Context) {
        const id = ctx.params.id;
        recipeService.deleteRecipe(id);
        ctx.response.body = 'Recipe deleted successfully';
    }

}