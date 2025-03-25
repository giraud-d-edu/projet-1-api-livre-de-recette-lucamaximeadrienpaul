import { AddIngredientDTO } from '../dtos/ingredient/add-ingredient.dto.ts';
import { IngredientDTO } from '../dtos/ingredient/ingredient.dto.ts';
import { UpdateIngredientDTO } from '../dtos/ingredient/update-ingredient.dto.ts';
import { IngredientService } from '../services/ingredient.service.ts';
import { checkId } from "./shared.controller.ts";

export class IngredientController {

    private readonly ingredientService: IngredientService = new IngredientService();

    getAllIngredients = async ({ response }: { response: any }) => {
        const ingredient: IngredientDTO[] = await this.ingredientService.getAllIngredients();
        response.body = ingredient;
        response.status = 200;
    }

    getIngredientById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        const ingredient: IngredientDTO = await this.ingredientService.getIngredientById(id);
        response.body = ingredient;
        response.status = 200;
    }

    createIngredient = async ({ request, response }: { request: any, response: any }) => {
        const body: AddIngredientDTO = AddIngredientDTO.fromRequest(await request.body.json());
        body.validate();
        const ingredient = await this.ingredientService.createIngredient(body);
        response.body = ingredient;
        response.status = 201;
    }

    updateIngredient = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const id = params.id;
        checkId(id);
        const body: UpdateIngredientDTO = UpdateIngredientDTO.fromRequest(await request.body.json());
        body.id = id;
        body.validate();
        const ingredient = await this.ingredientService.updateIngredient(body);
        response.body = ingredient;
        response.status = 200;
    }

    deleteIngredient = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        await this.ingredientService.deleteIngredient(id);
        response.status = 204;
    }

}