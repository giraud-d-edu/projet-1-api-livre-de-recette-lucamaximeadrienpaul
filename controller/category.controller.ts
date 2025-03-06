iport {CategoryDTO } from '../dtos/category/category.dto.ts';
import {AddCategoryDTO} from '../dtos/category/add-category.dto.ts';
import {UpdateCategoryDTO} from '../dtos/category/update-category.dto.ts';
import {CategoryService} from '../services/category.service.ts';

const categoryService = new CategoryService();

export class categoryController {

    static getAllCategory(ctx: Context) {
        const category : CategoryDTO = CategoryService.getAllCategory();
        ctx.response.body = category;
    }

    static getCategoryById(ctx: Context) {
        const id = ctx.params.id;
        const category : CategoryDTO = CategoryService.getCategoryById(id);
        ctx.response.body = category;
    }

    static async createCategory(ctx: Context) {
        const body : AddCategoryDTO = await ctx.request.body.json();
        const dataValidate = body.validate();
        if(!dataValidate) {
            return
        }
        const category : AddCategoryDTO = CategoryService.createCategory(body);
        ctx.response.body = category;

    }

    static async updateCategory(ctx: Context) {
        const id = ctx.params.id;
        const body : UpdateCategoryDTO = await ctx.request.body.json();
        const dataValidate = body.validate();
        if(!dataValidate) {
            return
        }
        const category : UpdateCategoryDTO = CategoryService.updateCategory(id, body);
        ctx.response.body = category;
    }

    static deleteCategory(ctx: Context) {
        const id = ctx.params.id;
        CategoryService.deleteCategory(id);
        ctx.response.body = 'Category deleted successfully';
    }
}