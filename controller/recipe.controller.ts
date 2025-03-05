import {RecipeService} from '../servicesTEMP/recipe.service.ts';

const recipeService = new RecipeService();


export class recipeController {

    static getAllRecipes(ctx: Context) {
        ctx.response.body = recipeService.getAllRecipes();
    }

    static getRecipeById(ctx: Context) {
        const id = Number(ctx.params.id);
        const recipe = recipeService.getRecipeById(id);
        ctx.response.body = recipe;
    }

    static async createRecipe(ctx: Context) {
        const body = await ctx.request.body.json();
        const recipe = recipeService.createRecipe(body);
        ctx.response.body = recipe;
    }

    static async updateRecipe(ctx: Context) {
        const id = Number(ctx.params.id);
        const body = await ctx.request.body.json();
        const recipe = recipeService.updateRecipe(id, body);
        ctx.response.body = recipe;
    }

    static deleteRecipe(ctx: Context) {
        const id = Number(ctx.params.id);
        recipeService.deleteRecipe(id);
        ctx.response.body = 'Recipe deleted successfully';
    }

}