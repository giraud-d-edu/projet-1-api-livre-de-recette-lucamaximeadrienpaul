// tests/dtos/recipe.dto.test.ts
import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { RecipeDTO, validateRecipeDTO } from "../../../dtos/recipe/recipe.dto.ts";
import { IngredientDTO } from "../../../dtos/ingredient/ingredient.dto.ts";

Deno.test("validateRecipeDTO - valid data", () => {
    const ingredients = [new IngredientDTO("Sugar", 100)];
    const data = new RecipeDTO("Cake", ingredients);
    const result = validateRecipeDTO(data);
    assertEquals(result, data);
});

Deno.test("validateRecipeDTO - invalid data", () => {
    const ingredients = [new IngredientDTO("", 0)];
    const data = new RecipeDTO("", ingredients);
    assertThrows(() => validateRecipeDTO(data), Error, "Le titre ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});