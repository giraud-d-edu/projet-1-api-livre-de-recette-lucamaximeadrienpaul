import { CategoryController } from '../controller/category.controller.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";


export const categoryRouter = new Router();
const ingredientController = new CategoryController();

categoryRouter.get('/', ingredientController.getAllCategory);
categoryRouter.get('/:id', ingredientController.getCategoryById);
categoryRouter.post('/', ingredientController.createCategory);
categoryRouter.put('/:id', ingredientController.updateCategory);
categoryRouter.delete('/:id', ingredientController.deleteCategory);