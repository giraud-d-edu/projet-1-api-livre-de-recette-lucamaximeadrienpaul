import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { CategoryDTO, validateCategoryDTO } from "../../../dtos/category/category.dto.ts";

Deno.test("validateCategoryDTO - valid data", () => {
    const data = new CategoryDTO("Category", "Description");
    const result = validateCategoryDTO(data);
    assertEquals(result, data);
});

Deno.test("validateCategoryDTO - invalid data", () => {
    const data = new CategoryDTO("", "");
    assertThrows(() => validateCategoryDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});