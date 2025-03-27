import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";
import { IngredientController } from "../../controller/ingredient.controller.ts";
import { IngredientDTO } from "../../dtos/ingredient/ingredient.dto.ts";
import { AddIngredientDTO } from "../../dtos/ingredient/add-ingredient.dto.ts";
import { UpdateIngredientDTO } from "../../dtos/ingredient/update-ingredient.dto.ts";
import { IngredientService } from "../../services/ingredient.service.ts";
import { CategoryDTO } from "../../dtos/category/category.dto.ts";

// Création d'un mock qui étend IngredientService pour respecter le type attendu
class MockIngredientService extends IngredientService {
  override async getAllIngredients() {
    return Promise.resolve([
      new IngredientDTO(
        "000000000000000000000101",
        "Ingredient 1",
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ]
      ),
      new IngredientDTO(
        "000000000000000000000102",
        "Ingredient 2",
        [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ]
      ),
    ]);
  }

  override async getIngredientById(id: string) {
    return Promise.resolve(
      new IngredientDTO(
        id,
        `Ingredient ${id}`,
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ]
      )
    );
  }

  override async createIngredient(dto: AddIngredientDTO) {
    return Promise.resolve(
      new IngredientDTO(
        "000000000000000000000103",
        dto.name,
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ]
      )
    );
  }

  override async updateIngredient(dto: UpdateIngredientDTO) {
    return Promise.resolve(
      new IngredientDTO(
        dto.id,
        dto.name || `Ingredient ${dto.id}`,
        [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ]
      )
    );
  }

  override async deleteIngredient(id: string) {
    return Promise.resolve();
  }
}

Deno.test("IngredientController: getAllIngredients should return ingredients", async () => {
  const mockIngredientService = new MockIngredientService();
  const controller = new IngredientController(mockIngredientService);

  const mockResponse = { body: null, status: null };

  await controller.getAllIngredients({ response: mockResponse });

  assertEquals(mockResponse.body, [
    new IngredientDTO(
      "000000000000000000000101",
      "Ingredient 1",
      [
        new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
      ]
    ),
    new IngredientDTO(
      "000000000000000000000102",
      "Ingredient 2",
      [
        new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
      ]
    ),
  ]);
  assertEquals(mockResponse.status, 200);
});

Deno.test("IngredientController: getIngredientById should return ingredient by id", async () => {
  const validId = "000000000000000000000101";
  const mockIngredientService = new MockIngredientService();
  const controller = new IngredientController(mockIngredientService);

  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.getIngredientById({ params: mockParams, response: mockResponse });

  assertEquals(mockResponse.body, new IngredientDTO(
    validId,
    `Ingredient ${validId}`,
    [
      new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
    ]
  ));
  assertEquals(mockResponse.status, 200);
});

Deno.test("IngredientController: createIngredient should create a new ingredient", async () => {
  const mockIngredientService = new MockIngredientService();
  const controller = new IngredientController(mockIngredientService);

  const mockRequest = { 
    body: { 
      json: () => Promise.resolve({ name: "New Ingredient", /* éventuellement d'autres propriétés */ }) 
    } 
  };
  const mockResponse = { body: null, status: null };

  await controller.createIngredient({ request: mockRequest, response: mockResponse });

  assertEquals(
    mockResponse.body,
    new IngredientDTO(
      "000000000000000000000103",
      "New Ingredient",
      [
        new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
      ]
    )
  );
  assertEquals(mockResponse.status, 201);
});

Deno.test("IngredientController: updateIngredient should update an ingredient", async () => {
  const validId = "000000000000000000000101";
  const mockIngredientService = new MockIngredientService();
  const controller = new IngredientController(mockIngredientService);

  const mockRequest = {
    body: { json: () => Promise.resolve({ name: "Updated Ingredient", /* éventuellement d'autres propriétés */ }) }
  };
  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.updateIngredient({ params: mockParams, request: mockRequest, response: mockResponse });

  assertEquals(
    mockResponse.body,
    new IngredientDTO(
      validId,
      "Updated Ingredient",
      [
        new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
      ]
    )
  );
  assertEquals(mockResponse.status, 200);
});

Deno.test("IngredientController: deleteIngredient should delete an ingredient", async () => {
  const validId = "000000000000000000000101";
  const mockIngredientService = new MockIngredientService();
  const controller = new IngredientController(mockIngredientService);

  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.deleteIngredient({ params: mockParams, response: mockResponse });

  // Pour la suppression, seul le code 204 est attendu
  assertEquals(mockResponse.status, 204);
});
