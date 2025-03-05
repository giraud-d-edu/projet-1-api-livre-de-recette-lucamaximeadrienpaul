import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { validateAddIngredientDTO, validateUpdateIngredientDTO } from "../../dtos/ingredient.dto.ts";

Deno.test("validateAddIngredientDTO - valid data", () => {
    const data = { name: "Ingredient", quantity: 1, unit: "kg" };
    const result = validateAddIngredientDTO(data);
    assertEquals(result, data);
});

Deno.test("validateAddIngredientDTO - invalid data", () => {
    const data = { name: "", quantity: -1, unit: "" };
    assertThrows(() => validateAddIngredientDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères..");
});

Deno.test("validateUpdateIngredientDTO - valid data", () => {
    const data = { name: "Updated Ingredient", quantity: 2, unit: "g" };
    const result = validateUpdateIngredientDTO(data);
    assertEquals(result, data);
});

Deno.test("validateUpdateIngredientDTO - invalid data", () => {
    const data = { name: "", quantity: -1, unit: "" };
    assertThrows(() => validateUpdateIngredientDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});