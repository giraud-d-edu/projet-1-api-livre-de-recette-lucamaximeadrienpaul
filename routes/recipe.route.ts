import { RecipeController } from '../controller/recipe.controller.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";
import { RecipeService } from "../services/recipe.service.ts";
import { RecipeRepository } from "../repositories/recipe.repository.ts";


export const recipeRouter = new Router();
const recipeController = new RecipeController(new RecipeService(new RecipeRepository()));

recipeRouter.get('', recipeController.getAllRecipes);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.post('', recipeController.createRecipe);
recipeRouter.put('/:id', recipeController.updateRecipe);
recipeRouter.delete('/:id', recipeController.deleteRecipe);