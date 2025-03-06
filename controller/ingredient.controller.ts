import {AddIngredientDTO} from '../dtos/ingredient/add-ingredient.dto.ts';
import {IngredientDTO} from '../dtos/ingredient/ingredient.dto.ts';
import {updateIngredientDTO} from '../dtos/ingredient/update-ingredient.dto.ts';
import {IngredientService} from '../servicesTEMP/ingredient.service.ts';

const ingredientService = new IngredientService();

export class ingredientController {

    static getAllIngredients(ctx: Context) {
        const ingredient : IngredientDTO = IngredientService.getAllIngredients();
        ctx.response.body = ingredient;
    }

    static getIngredientById(ctx: Context) {
        const id = ctx.params.id;
        const ingredient : IngredientDTO = IngredientService.getIngredientById(id);
        ctx.response.body = ingredient;
    }

    static async createIngredient(ctx: Context) {
        const body : AddIngredientDTO = await ctx.request.body.json();
        const dataValidate = body.validate();
        if(!dataValidate) {
            return
        }
        const ingredient : AddIngredientDTO = IngredientService.createIngredient(body);
        ctx.response.body = ingredient;

    }

    static async updateIngredient(ctx: Context) {
        const id = ctx.params.id;
        const body : updateIngredientDTO = await ctx.request.body.json();
        const dataValidate = updateIngredientDTO.validate(body);
        if(!dataValidate) {
            return
        }
        const ingredient : updateIngredientDTO = IngredientService.updateIngredient(id, body);
        ctx.response.body = ingredient;
    }

    static deleteIngredient(ctx: Context) {
        const id = ctx.params.id;
        IngredientService.deleteIngredient(id);
        ctx.response.body = 'Ingredient deleted successfully';
    }

}