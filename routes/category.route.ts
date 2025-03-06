import { CategoryController } from '../controller/category.controller.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";
import { CategoryService } from "../services/category.service.ts";
import { CategoryRepository } from "../repositories/category.repository.ts";


export const categoryRouter = new Router();
const ingredientController = new CategoryController(new CategoryService(new CategoryRepository()));

categoryRouter.get('', ingredientController.getAllCategory);
categoryRouter.get('/:id', ingredientController.getCategoryById);
categoryRouter.post('', ingredientController.createCategory);
categoryRouter.put('/:id', ingredientController.updateCategory);
categoryRouter.delete('/:id', ingredientController.deleteCategory);