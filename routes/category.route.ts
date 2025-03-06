import {categoryController} from '../controller/category.controller.ts';
import { Application, Router} from "https://deno.land/x/oak/mod.ts";


const Categoryrouter = new Router();

Categoryrouter.get('/category', ingredientController.getAllCategory);
Categoryrouter.get('/category/:id', ingredientController.getCategoryById);
Categoryrouter.post('/category', ingredientController.createCategory);
Categoryrouter.put('/category/:id', ingredientController.updateCategory);
Categoryrouter.delete('/category/:id', ingredientController.deleteCategory);