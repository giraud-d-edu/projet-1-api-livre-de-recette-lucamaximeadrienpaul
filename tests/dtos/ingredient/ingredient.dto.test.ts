import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { IngredientDTO } from "../../../dtos/ingredient/ingredient.dto.ts";

Deno.test("validateIngredientDTO - valid data", () => {
    const data = new IngredientDTO(
        "1",
        "Sugar",
        ["category1", "category2"]
    );
    const result = IngredientDTO.validate(data);
    assertEquals(result, data);
});

Deno.test("validateIngredientDTO - invalid data", () => {
    const data = new IngredientDTO(
        "1",
        "",
        []
    );
    assertThrows(() => IngredientDTO.validate(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});