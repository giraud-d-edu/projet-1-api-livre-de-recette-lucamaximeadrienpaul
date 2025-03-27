import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";
import { CategoryController } from "../../controller/category.controller.ts";
import { CategoryDTO } from "../../dtos/category/category.dto.ts";
import { AddCategoryDTO } from "../../dtos/category/add-category.dto.ts";
import { UpdateCategoryDTO } from "../../dtos/category/update-category.dto.ts";
import { CategoryService } from "../../services/category.service.ts";
import { FilterCategoryDTO } from "../../dtos/category/filter-category.dto.ts";

// Création d'un mock qui étend CategoryService pour respecter le type attendu
class MockCategoryService extends CategoryService {
  override async getAllCategories(filter?: FilterCategoryDTO) {
    return Promise.resolve([
      new CategoryDTO("000000000000000000000001", "Category 1", "Type 1"),
      new CategoryDTO("000000000000000000000002", "Category 2", "Type 2"),
    ]);
  }

  override async getCategoryById(id: string) {
    return Promise.resolve(new CategoryDTO(id, `Category ${id}`, "Type 1"));
  }

  override async createCategory(categoryDto: AddCategoryDTO) {
    return Promise.resolve(new CategoryDTO("000000000000000000000003", categoryDto.name, categoryDto.Type));
  }

  override async updateCategory(categoryDto: UpdateCategoryDTO) {
    return Promise.resolve(new CategoryDTO(
      categoryDto.id,
      categoryDto.name || `Category ${categoryDto.id}`,
      categoryDto.Type || "Type 1"
    ));
  }

  override async deleteCategory(id: string) {
    return Promise.resolve();
  }
}

Deno.test("CategoryController: getAllCategory should return categories", async () => {
  const mockCategoryService = new MockCategoryService();
  const controller = new CategoryController(mockCategoryService);

  const mockRequest = {
    url: "http://localhost/categories?type=Type 1",
  };
  const mockResponse = {
    body: null,
    status: null,
  };

  await controller.getAllCategory({ request: mockRequest, response: mockResponse });

  assertEquals(mockResponse.body, [
    new CategoryDTO("000000000000000000000001", "Category 1", "Type 1"),
    new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
  ]);
  assertEquals(mockResponse.status, 200);
});

Deno.test("CategoryController: getCategoryById should return category by id", async () => {
  const validId = "000000000000000000000001";
  const mockCategoryService = new MockCategoryService();
  const controller = new CategoryController(mockCategoryService);

  const mockRequest = { url: `http://localhost/categories/${validId}` };
  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.getCategoryById({ params: mockParams, response: mockResponse });

  assertEquals(mockResponse.body, new CategoryDTO(validId, `Category ${validId}`, "Type 1"));
  assertEquals(mockResponse.status, 200);
});

Deno.test("CategoryController: createCategory should create a new category", async () => {
  const mockCategoryService = new MockCategoryService();
  const controller = new CategoryController(mockCategoryService);

  const mockRequest = { body: { json: () => Promise.resolve({ name: "New Category", Type: "New Type" }) } };
  const mockResponse = { body: null, status: null };

  await controller.createCategory({ request: mockRequest, response: mockResponse });

  assertEquals(mockResponse.body, new CategoryDTO("000000000000000000000003", "New Category", "New Type"));
  assertEquals(mockResponse.status, 201);
});
