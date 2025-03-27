import { AddIngredientDTO } from "../../../dtos/ingredient/add-ingredient.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("AddIngredientDTO: validate should pass with valid data", () => {
    const data = { name: "Valid Ingredient", categoriesId: ["605c72ef1532071d201c3d8a"] };
    const dto = AddIngredientDTO.fromRequest(data);
    dto.validate();
});

Deno.test("AddIngredientDTO: should throw error if name is empty", () => {
    const data = { categoriesId: ["605c72ef1532071d201c3d8a"] };
    const dto = AddIngredientDTO.fromRequest(data);
    
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddIngredientDTO: should throw error if name exceeds 255 characters", () => {
    const data = { name: "a".repeat(256), categoriesId: ["605c72ef1532071d201c3d8"] };
    const dto = AddIngredientDTO.fromRequest(data);
    
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddIngredientDTO: should throw error if categoriesId contains invalid id", () => {
    const data = { name: "Valid Ingredient", categoriesId: ["invalidId"] };
    const dto = AddIngredientDTO.fromRequest(data);

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
