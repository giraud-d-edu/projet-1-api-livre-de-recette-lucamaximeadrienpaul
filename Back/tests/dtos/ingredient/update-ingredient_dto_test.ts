import { UpdateIngredientDTO } from "../../../dtos/ingredient/update-ingredient.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("UpdateIngredientDTO: validate should pass with valid data", () => {
    const data = { id: "605c72ef1532071d201c3d8", name: "Updated Ingredient", categoriesId: ["605c72ef1532071d201c3d8a"] };
    const dto = UpdateIngredientDTO.fromRequest(data);
    dto.validate();
});

Deno.test("UpdateIngredientDTO: should throw error if name exceeds 255 characters", () => {
    const data = { id: "605c72ef1532071d201c3d8", name: "a".repeat(256), categoriesId: ["605c72ef1532071d201c3d8a"] };
    const dto = UpdateIngredientDTO.fromRequest(data);

    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le nom ne doit pas excéder 255 caractères.");
        } else {
            throw error;
        }
    }
});

Deno.test("UpdateIngredientDTO: should throw error if categoriesId contains invalid id", () => {
    const data = { id: "605c72ef1532071d201c3d8", name: "Updated Ingredient", categoriesId: ["invalidId"] };
    const dto = UpdateIngredientDTO.fromRequest(data);

    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "les id des categories doivent être une chaîne de 24 caractères hexadécimaux");
        } else {
            throw error;
        }
    }
});

