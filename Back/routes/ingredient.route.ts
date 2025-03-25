import { IngredientController } from '../controller/ingredient.controller.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";


export const ingredientRouter = new Router();
const ingredientController = new IngredientController();

ingredientRouter.get('/', ingredientController.getAllIngredients);
ingredientRouter.get('/:id', ingredientController.getIngredientById);
ingredientRouter.post('/', ingredientController.createIngredient);
ingredientRouter.put('/:id', ingredientController.updateIngredient);
ingredientRouter.delete('/:id', ingredientController.deleteIngredient);