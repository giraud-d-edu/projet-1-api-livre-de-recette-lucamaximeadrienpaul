import { IngredientController } from '../controller/ingredient.controller.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";
import { IngredientService } from "../services/ingredient.service.ts";
import { IngredientRepository } from "../repositories/ingredient.repository.ts";


export const ingredientRouter = new Router();
const ingredientController = new IngredientController(new IngredientService(new IngredientRepository()));

ingredientRouter.get('', ingredientController.getAllIngredients);
ingredientRouter.get('/:id', ingredientController.getIngredientById);
ingredientRouter.post('', ingredientController.createIngredient);
ingredientRouter.put('/:id', ingredientController.updateIngredient);
ingredientRouter.delete('/:id', ingredientController.deleteIngredient);