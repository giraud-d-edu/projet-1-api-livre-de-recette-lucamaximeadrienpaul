import { IngredientDTO } from "../../../dtos/ingredient/ingredient.dto.ts";
import { Ingredient } from "../../../models/ingredient.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("IngredientDTO: fromModel should transform a model into a DTO", () => {
    const mockCategory = { id: "605c72ef1532071d201c3d8", name: "Category 1", Type: "Type 1" };
    
    const mockIngredient: Ingredient = {
        id: "605c72ef1532071d201c3d8",
        name: "Ingredient 1",
        categories: [mockCategory]
    };

    const dto = IngredientDTO.fromModel(mockIngredient);
    assertEquals(dto.id, mockIngredient.id);
    assertEquals(dto.name, mockIngredient.name);
    assertEquals(dto.categories.length, 1);
    assertEquals(dto.categories[0].id, mockCategory.id);
    assertEquals(dto.categories[0].name, mockCategory.name);
    assertEquals(dto.categories[0].Type, mockCategory.Type);
});