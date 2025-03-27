import { RecipeDTO } from "../../../dtos/recipe/recipe.dto.ts";
import { Recipe } from "../../../models/recipe.model.ts";

import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("RecipeDTO: fromModel should map Recipe model to RecipeDTO", () => {
    const mockCategory = { id: "605c72ef1532071d201c3d8", name: "Category 1", Type: "Type 1" };
    const mockIngredient = { id: "605c72ef1532071d201c3d8", name: "Ingredient 1", categories: [mockCategory] };

        const recipe: Recipe = {
          id: "605c72ef1532071d201c3d8",
          name: "Ingredient 1",
          ingredients: [mockIngredient],
          categories: [mockCategory],
          description: "",
          step: "",
          time: 0,
          origin: ""
        };
    const dto = RecipeDTO.fromModel(recipe);

    assertEquals(dto.id, recipe.id);
    assertEquals(dto.name, recipe.name);
    assertEquals(dto.description, recipe.description);
    assertEquals(dto.step, recipe.step);
    assertEquals(dto.time, recipe.time);
    assertEquals(dto.origin, recipe.origin);

    // Verify ingredients mapping
    assertEquals(dto.ingredients.length, 1);
    assertEquals(dto.ingredients[0].id, "605c72ef1532071d201c3d8");
    // Verify categories mapping
    assertEquals(dto.categories.length, 1);
    assertEquals(dto.categories[0].id, "605c72ef1532071d201c3d8");
});
