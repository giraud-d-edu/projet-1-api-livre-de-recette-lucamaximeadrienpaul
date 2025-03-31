import { CategoryDTO } from '../dtos/category/category.dto.ts';
import { AddCategoryDTO } from '../dtos/category/add-category.dto.ts';
import { UpdateCategoryDTO } from '../dtos/category/update-category.dto.ts';
import { CategoryService } from '../services/category.service.ts';
import { FilterCategoryDTO } from '../dtos/category/filter-category.dto.ts';
import { checkId } from "./shared.controller.ts";
import { Category } from '../models/category/category.model.ts';

export class CategoryController {
  constructor(public categoryService: CategoryService = new CategoryService()) {}

  getAllCategory = async ({ request, response }: { request: any, response: any }) => {
    const queryParams = new URL(request.url).searchParams;
    const filter: FilterCategoryDTO = FilterCategoryDTO.fromRequest(Object.fromEntries(queryParams));
    filter.validate();
    const categories: Category[] = await this.categoryService.getAllCategories(filter.toModel());
    response.body = categories.map((category: Category) => CategoryDTO.fromModel(category));
    response.status = 200;
  };

  getCategoryById = async ({ params, response }: { params: { id: string }, response: any }) => {
    const id = params.id;
    checkId(id);
    const category: Category = await this.categoryService.getCategoryById(id);
    response.body = CategoryDTO.fromModel(category);
    response.status = 200;
  };

  createCategory = async ({ request, response }: { request: any, response: any }) => {
    const body: AddCategoryDTO = AddCategoryDTO.fromRequest(await request.body.json());
    body.validate();
    const category = await this.categoryService.createCategory(body.toModel());
    response.body = CategoryDTO.fromModel(category);
    response.status = 201;
  };

  updateCategory = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const id = params.id;
    checkId(id);
    const body: UpdateCategoryDTO = UpdateCategoryDTO.fromRequest(await request.body.json());
    body.id = id;
    body.validate();
    const category = await this.categoryService.updateCategory(body.toModel());
    response.body = CategoryDTO.fromModel(category);
    response.status = 200;
  };

  deleteCategory = async ({ params, response }: { params: { id: string }, response: any }) => {
    const id = params.id;
    checkId(id);
    await this.categoryService.deleteCategory(id);
    response.status = 204;
  };
}
