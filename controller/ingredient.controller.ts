import {AddIngredientDTO} from '../dtos/ingredient/add-ingredient.dto.ts';
import {IngredientDTO} from '../dtos/ingredient/ingredient.dto.ts';
import {updateIngredientDTO} from '../dtos/ingredient/update-ingredient.dto.ts';
import {IngredientService} from '../servicesTEMP/ingredient.service.ts';

const ingredientService = new IngredientService();

export class ingredientController {

    static getAllIngredients(ctx: Context) {
        const ingredient : IngredientDTO = IngredientService.getAllIngredients();
        ctx.response.body = ingredient;
        ctx.response.status = 200;
    }

    static getIngredientById(ctx: Context) {
        const id = ctx.params.id;
        const ingredient : IngredientDTO = IngredientService.getIngredientById(id);
        ctx.response.body = ingredient;
        ctx.response.status = 200;
    }

    static async createIngredient(ctx: Context) {
        const body : AddIngredientDTO = await ctx.request.body.json();
        body.validate();

        const ingredient : AddIngredientDTO = IngredientService.createIngredient(body);
        ctx.response.body = ingredient;
        ctx.response.status = 201;
    }

    static async updateIngredient(ctx: Context) {
        const id = ctx.params.id;
        const body : updateIngredientDTO = await ctx.request.body.json();
        body.validate();
        const ingredient : updateIngredientDTO = IngredientService.updateIngredient(id, body);
        ctx.response.body = ingredient;
        ctx.response.status = 200;
    }

    static deleteIngredient(ctx: Context) {
        const id = ctx.params.id;
        IngredientService.deleteIngredient(id);
        ctx.response.status = 204;
    }

}