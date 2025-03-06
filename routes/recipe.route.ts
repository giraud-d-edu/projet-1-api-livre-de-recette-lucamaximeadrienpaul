import {recipeController} from '../controller/recipe.controller.ts';
import { Application, Router} from "https://deno.land/x/oak/mod.ts";


const Reciperouter = new Router();

Reciperouter.get('/recipes', recipeController.getAllRecipes);
Reciperouter.get('/recipes/:id', recipeController.getRecipeById);
Reciperouter.post('/recipes', recipeController.createRecipe);
Reciperouter.put('/recipes/:id', recipeController.updateRecipe);
Reciperouter.delete('/recipes/:id', recipeController.deleteRecipe);