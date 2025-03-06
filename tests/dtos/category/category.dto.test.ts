import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { CategoryDTO } from "../../../dtos/category/category.dto.ts";

Deno.test("validateCategoryDTO - valid data", () => {
    const data = new CategoryDTO("1", "Dessert", "Sweet treats");
    const result = new CategoryDTO(data.id, data.name, data.description);
    assertEquals(result, data);
});

Deno.test("validateCategoryDTO - invalid data", () => {
    const data = new CategoryDTO("1", "", "Description");
    assertThrows(() => {
        const categoryDTO = new CategoryDTO(data.id, data.name, data.description);
        categoryDTO.validate();
    }, Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});