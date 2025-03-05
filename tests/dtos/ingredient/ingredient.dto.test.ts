// tests/dtos/ingredient.dto.test.ts
import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { IngredientDTO, validateIngredientDTO } from "../../../dtos/ingredient/ingredient.dto.ts";

Deno.test("validateIngredientDTO - valid data", () => {
    const data = new IngredientDTO("Sugar", 100);
    const result = validateIngredientDTO(data);
    assertEquals(result, data);
});

Deno.test("validateIngredientDTO - invalid data", () => {
    const data = new IngredientDTO("", 0);
    assertThrows(() => validateIngredientDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});