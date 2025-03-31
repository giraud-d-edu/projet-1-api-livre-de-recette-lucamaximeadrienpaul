import { AddIngredientDTO } from '../dtos/ingredient/add-ingredient.dto.ts';
import { IngredientDTO } from '../dtos/ingredient/ingredient.dto.ts';
import { UpdateIngredientDTO } from '../dtos/ingredient/update-ingredient.dto.ts';
import { Ingredient } from '../models/ingredient/ingredient.model.ts';
import { IngredientService } from '../services/ingredient.service.ts';
import { checkId } from "./shared.controller.ts";

export class IngredientController {
    constructor(public ingredientService: IngredientService = new IngredientService()) {}

    getAllIngredients = async ({ response }: { response: any }) => {
        const ingredients: Ingredient[] = await this.ingredientService.getAllIngredients();
        const ingredientsDto: IngredientDTO[] = ingredients.map(ingredient => IngredientDTO.fromModel(ingredient));
        response.body = ingredientsDto;
        response.status = 200;
    }

    getIngredientById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        const ingredient: Ingredient = await this.ingredientService.getIngredientById(id);
        const ingredientDto: IngredientDTO = IngredientDTO.fromModel(ingredient);
        response.body = ingredientDto;
        response.status = 200;
    }

    createIngredient = async ({ request, response }: { request: any, response: any }) => {
        const addIngredient: AddIngredientDTO = AddIngredientDTO.fromRequest(await request.body.json());
        addIngredient.validate();
        const ingredient = await this.ingredientService.createIngredient(addIngredient.toModel());
        response.body = IngredientDTO.fromModel(ingredient);
        response.status = 201;
    }

    updateIngredient = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const id = params.id;
        checkId(id);
        const updateIngredient: UpdateIngredientDTO = UpdateIngredientDTO.fromRequest(await request.body.json());
        updateIngredient.id = id;
        updateIngredient.validate();
        const ingredient = await this.ingredientService.updateIngredient(updateIngredient.toModel());
        response.body = IngredientDTO.fromModel(ingredient);
        response.status = 200;
    }

    deleteIngredient = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        await this.ingredientService.deleteIngredient(id);
        response.status = 204;
    }

}