import {CategoryDTO } from '../dtos/category/category.dto.ts';
import {AddCategoryDTO} from '../dtos/category/add-category.dto.ts';
import {UpdateCategoryDTO} from '../dtos/category/update-category.dto.ts';
import {CategoryService} from '../services/category.service.ts';

const categoryService = new CategoryService();

export class categoryController {

    static getAllCategory(ctx: Context) {
        const category : CategoryDTO = CategoryService.getAllCategory();
        ctx.response.body = category;
        ctx.response.status = 200;
    }

    static getCategoryById(ctx: Context) {
        const id = ctx.params.id;
        const category : CategoryDTO = CategoryService.getCategoryById(id);
        ctx.response.body = category;
        ctx.response.status = 200;
    }

    static async createCategory(ctx: Context) {
        const body : AddCategoryDTO = await ctx.request.body.json();
        body.validate();
        const category : AddCategoryDTO = CategoryService.createCategory(body);
        ctx.response.body = category;
        ctx.response.status = 201;

    }

    static async updateCategory(ctx: Context) {
        const id = ctx.params.id;
        const body : UpdateCategoryDTO = await ctx.request.body.json();
        body.validate();
        const category : UpdateCategoryDTO = CategoryService.updateCategory(id, body);
        ctx.response.body = category;
        ctx.response.status = 200;
    }

    static deleteCategory(ctx: Context) {
        const id = ctx.params.id;
        CategoryService.deleteCategory(id);
        ctx.response.status = 204;
    }
}