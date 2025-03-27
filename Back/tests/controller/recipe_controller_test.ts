import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";
import { RecipeController } from "../../controller/recipe.controller.ts";
import { RecipeDTO } from "../../dtos/recipe/recipe.dto.ts";
import { AddRecipeDTO } from "../../dtos/recipe/add-recipe.dto.ts";
import { UpdateRecipeDTO } from "../../dtos/recipe/update-recipe.dto.ts";
import { RecipeService } from "../../services/recipe.service.ts";
import { FilterRecipeDTO } from "../../dtos/recipe/filter-recipe.dto.ts";
import { CategoryDTO } from "../../dtos/category/category.dto.ts";
import { IngredientDTO } from "../../dtos/ingredient/ingredient.dto.ts";

class MockRecipeService extends RecipeService {
  override async getRecipes(filter?: FilterRecipeDTO) {
    return Promise.resolve([
      new RecipeDTO(
        "000000000000000000000201",
        "Recipe 1",
        [
          new IngredientDTO("000000000000000000000101", "Ingredient 1", [
            new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
          ])
        ],
        "Description 1",
        "Step 1",
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ],
        30,
        "Origin 1",
        ""
      ),
      new RecipeDTO(
        "000000000000000000000202",
        "Recipe 2",
        [
          new IngredientDTO("000000000000000000000102", "Ingredient 2", [
            new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
          ])
        ],
        "Description 2",
        "Step 2",
        [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ],
        45,
        "Origin 2",
        ""
      )
    ]);
  }

  override async getRecipeById(id: string) {
    return Promise.resolve(
      new RecipeDTO(
        id,
        `Recipe ${id}`,
        [
          new IngredientDTO("000000000000000000000101", "Ingredient 1", [
            new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
          ])
        ],
        "Description",
        "Step",
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ],
        30,
        "Origin",
        ""
      )
    );
  }

  override async createRecipe(dto: AddRecipeDTO) {
    return Promise.resolve(
      new RecipeDTO(
        "000000000000000000000203",
        dto.name,
        [
          new IngredientDTO("000000000000000000000101", "Ingredient 1", [
            new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
          ])
        ],
        dto.description,
        dto.step,
        [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ],
        dto.time,
        dto.origin || "",
        ""
      )
    );
  }

  override async updateRecipe(dto: UpdateRecipeDTO) {
    return Promise.resolve(
      new RecipeDTO(
        dto.id,
        dto.name || `Recipe ${dto.id}`,
        [
          new IngredientDTO("000000000000000000000102", "Ingredient 2", [
            new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
          ])
        ],
        dto.description || "Updated Description",
        dto.step || "Updated Step",
        [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ],
        dto.time || 60,
        dto.origin || "Updated Origin",
        ""
      )
    );
  }

  override async deleteRecipe(id: string) {
    return Promise.resolve();
  }
}

// Classe pour simuler un objet FormData dans les tests
class FakeFormData {
  private data: Map<string, string | File | string[]>;
  constructor(data: { [key: string]: string | string[] | File | undefined }) {
    this.data = new Map();
    for (const key in data) {
      if (data[key] !== undefined) {
        this.data.set(key, data[key]!);
      }
    }
  }
  get(key: string): string | File | null {
    const value = this.data.get(key);
    if (Array.isArray(value)) {
      return value[0];
    }
    return value || null;
  }
  getAll(key: string): string[] {
    const value = this.data.get(key);
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === "string") {
      return [value];
    }
    return [];
  }
}

Deno.test("RecipeController: getAllRecipes should return recipes", async () => {
  const mockRecipeService = new MockRecipeService();
  const controller = new RecipeController(mockRecipeService);

  const mockRequest = {
    url: "http://localhost/recipes?name=Recipe",
  };
  const mockResponse = { body: null, status: null };

  await controller.getAllRecipes({ request: mockRequest, response: mockResponse });

  assertEquals(mockResponse.body, [
    new RecipeDTO(
      "000000000000000000000201",
      "Recipe 1",
      [
        new IngredientDTO("000000000000000000000101", "Ingredient 1", [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ])
      ],
      "Description 1",
      "Step 1",
      [
        new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
      ],
      30,
      "Origin 1",
      ""
    ),
    new RecipeDTO(
      "000000000000000000000202",
      "Recipe 2",
      [
        new IngredientDTO("000000000000000000000102", "Ingredient 2", [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ])
      ],
      "Description 2",
      "Step 2",
      [
        new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
      ],
      45,
      "Origin 2",
      ""
    )
  ]);
  assertEquals(mockResponse.status, 200);
});

Deno.test("RecipeController: getRecipeById should return a recipe by id", async () => {
  const validId = "000000000000000000000201";
  const mockRecipeService = new MockRecipeService();
  const controller = new RecipeController(mockRecipeService);

  const mockRequest = { url: `http://localhost/recipes/${validId}` };
  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.getRecipeById({ params: mockParams, response: mockResponse });

  assertEquals(
    mockResponse.body,
    new RecipeDTO(
      validId,
      `Recipe ${validId}`,
      [
        new IngredientDTO("000000000000000000000101", "Ingredient 1", [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ])
      ],
      "Description",
      "Step",
      [
        new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
      ],
      30,
      "Origin",
      ""
    )
  );
  assertEquals(mockResponse.status, 200);
});

Deno.test("RecipeController: createRecipe should create a new recipe", async () => {
  const mockRecipeService = new MockRecipeService();
  const controller = new RecipeController(mockRecipeService);

  const fakeFormData = new FakeFormData({
    name: "New Recipe",
    ingredientsId: ["000000000000000000000101"],
    description: "New Description",
    step: "New Step",
    categoriesId: ["000000000000000000000001"],
    time: "50",
    origin: "New Origin"
    // image n'est pas défini ici
  });

  const mockRequest = { 
    body: { 
      type: () => "form-data",
      formData: () => Promise.resolve(fakeFormData)
    } 
  };
  const mockResponse = { body: null, status: null };

  await controller.createRecipe({ request: mockRequest, response: mockResponse });

  assertEquals(
    mockResponse.body,
    new RecipeDTO(
      "000000000000000000000203",
      "New Recipe",
      [
        new IngredientDTO("000000000000000000000101", "Ingredient 1", [
          new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
        ])
      ],
      "New Description",
      "New Step",
      [
        new CategoryDTO("000000000000000000000001", "Category 1", "Type 1")
      ],
      50,
      "New Origin",
      ""
    )
  );
  assertEquals(mockResponse.status, 201);
});

Deno.test("RecipeController: updateRecipe should update a recipe", async () => {
  const validId = "000000000000000000000201";
  const mockRecipeService = new MockRecipeService();
  const controller = new RecipeController(mockRecipeService);

  const fakeFormData = new FakeFormData({
    name: "Updated Recipe",
    ingredientsId: ["000000000000000000000102"],
    description: "Updated Description",
    step: "Updated Step",
    categoriesId: ["000000000000000000000002"],
    time: "60",
    origin: "Updated Origin"
  });

  const mockRequest = {
    body: {
      type: () => "form-data",
      formData: () => Promise.resolve(fakeFormData)
    }
  };
  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.updateRecipe({ params: mockParams, request: mockRequest, response: mockResponse });

  assertEquals(
    mockResponse.body,
    new RecipeDTO(
      validId,
      "Updated Recipe",
      [
        new IngredientDTO("000000000000000000000102", "Ingredient 2", [
          new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
        ])
      ],
      "Updated Description",
      "Updated Step",
      [
        new CategoryDTO("000000000000000000000002", "Category 2", "Type 2")
      ],
      60,
      "Updated Origin",
      ""
    )
  );
  assertEquals(mockResponse.status, 200);
});

Deno.test("RecipeController: deleteRecipe should delete a recipe", async () => {
  const validId = "000000000000000000000201";
  const mockRecipeService = new MockRecipeService();
  const controller = new RecipeController(mockRecipeService);

  const mockResponse = { body: null, status: null };
  const mockParams = { id: validId };

  await controller.deleteRecipe({ params: mockParams, response: mockResponse });

  assertEquals(mockResponse.status, 204);
});
