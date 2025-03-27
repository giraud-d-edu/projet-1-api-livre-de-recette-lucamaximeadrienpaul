import { UpdateRecipeDTO } from "../../../dtos/recipe/update-recipe.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("UpdateRecipeDTO: validate should throw error if name exceeds 255 characters", () => {
    const dto = new UpdateRecipeDTO("1", "a".repeat(256), ["ingredient1"], "Description", "Step", ["category1"], 30);
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
Deno.test("UpdateRecipeDTO: validate should throw error if ingredientsId is empty", () => {
    const dto = new UpdateRecipeDTO("1", "Recipe", [], "Description", "Step", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "La recette doit contenir au moins un ingrédient.");
        } else {
            throw error;
        }
    }
});
Deno.test("UpdateRecipeDTO: validate should throw error if description is empty", () => {
    const dto = new UpdateRecipeDTO("1", "Recipe", ["ingredient1"], "", "Step", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Les id des catégories doivent être une chaîne de 24 caractères hexadécimaux.");
        } else {
            throw error;
        }
    }
});
Deno.test("UpdateRecipeDTO: validate should throw error if step is empty", () => {
    const dto = new UpdateRecipeDTO("1", "Recipe", ["ingredient1"], "Description", "", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Les id des catégories doivent être une chaîne de 24 caractères hexadécimaux.");
        } else {
            throw error;
        }
    }
});
Deno.test("UpdateRecipeDTO: validate should throw error if categoriesId is empty", () => {
    const dto = new UpdateRecipeDTO("1", "Recipe", ["ingredient1"], "Description", "Step", [], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "La recette doit contenir au moins une catégorie.");
        } else {
            throw error;
        }
    }
});
Deno.test("UpdateRecipeDTO: validate should throw error if time is negative", () => {
    const dto = new UpdateRecipeDTO("1", "Recipe", ["ingredient1"], "Description", "Step", ["category1"], -5);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le temps de préparation doit être positif.");
        } else {
            throw error;
        }
    }
});

Deno.test("UpdateRecipeDTO: fromFormData should handle missing or invalid data", async () => {
    const formData = new FormData();
    formData.set("name", "Incomplete Recipe");
    formData.set("ingredientsId", "ingredient1");
    formData.set("description", "");
    formData.set("step", "Incomplete step");
    formData.set("categoriesId", "category1");
    formData.set("time", "-10");
    formData.set("origin", "USA");

    try {
        const dto = await UpdateRecipeDTO.fromFormData("1", formData);
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le temps de préparation doit être positif.");
        } else {
            throw error;
        }
    }
});
