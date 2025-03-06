import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { IngredientDTO } from "../../../dtos/ingredient/ingredient.dto.ts";

Deno.test("validateIngredientDTO - valid data", () => {
    const data = new IngredientDTO("1", "Sugar", ["category1", "category2"]);
    const result = new IngredientDTO(data.id, data.name, data.categoriesId);
    assertEquals(result, data);
});

Deno.test("validateIngredientDTO - invalid data", () => {
    const data = new IngredientDTO("1", "", []);
    assertThrows(() => {
        const ingredientDTO = new IngredientDTO(data.id, data.name, data.categoriesId);
        ingredientDTO.validate();
    }, Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});