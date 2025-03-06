import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { RecipeDTO } from "../../../dtos/recipe/recipe.dto.ts";

Deno.test("validateRecipeDTO - valid data", () => {
    const data = new RecipeDTO(
        "1",
        "Cake",
        ["ingredient1", "ingredient2"],
        "Delicious cake",
        "Step by step",
        ["category1", "category2"],
        60,
        "France"
    );
    const result = RecipeDTO.validate(data);
    assertEquals(result, data);
});

Deno.test("validateRecipeDTO - invalid data", () => {
    const data = new RecipeDTO(
        "1",
        "",
        [],
        "Description",
        "Step",
        ["category1", "category2"],
        30,
        "Origin"
    );
    assertThrows(() => RecipeDTO.validate(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});