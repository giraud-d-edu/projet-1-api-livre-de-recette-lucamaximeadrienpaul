import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { validateCategoryDTO } from "../../dtos/category.dto.ts";

Deno.test("validateCategoryDTO - valid data", () => {
    const data = { name: "Category", description: "Description" };
    const result = validateCategoryDTO(data);
    assertEquals(result, data);
});

Deno.test("validateCategoryDTO - invalid data", () => {
    const data = { name: "", description: "" };
    assertThrows(() => validateCategoryDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});