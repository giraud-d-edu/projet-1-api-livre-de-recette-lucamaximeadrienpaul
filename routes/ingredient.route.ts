import {ingredientController} from '../controller/ingredient.controller.ts';
import { Application, Router} from "https://deno.land/x/oak/mod.ts";


const Ingredientrouter = new Router();

Ingredientrouter.get('/ingredients', ingredientController.getAllIngredients);
Ingredientrouter.get('/ingredients/:id', ingredientController.getIngredientById);
Ingredientrouter.post('/ingredients', ingredientController.createIngredient);
Ingredientrouter.put('/ingredients/:id', ingredientController.updateIngredient);
Ingredientrouter.delete('/ingredients/:id', ingredientController.deleteIngredient);