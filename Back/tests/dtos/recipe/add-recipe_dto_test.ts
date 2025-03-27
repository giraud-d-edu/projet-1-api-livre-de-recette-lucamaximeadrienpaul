import { AddRecipeDTO } from "../../../dtos/recipe/add-recipe.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("AddRecipeDTO: validate should pass with valid input", () => {
    const dto = new AddRecipeDTO("Valid Recipe", ["aaaaaaaaaaaaaaaaaaaaaaaa"], "Description", "Step", ["aaaaaaaaaaaaaaaaaaaaaaaa"], 30);
    try {
        dto.validate();
    } catch (error) {
        throw new Error("Test failed: Validation threw an error.");
    }
});
Deno.test("AddRecipeDTO: validate should throw error if name is empty", () => {
    const dto = new AddRecipeDTO("", ["ingredient1"], "Description", "Step", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddRecipeDTO: validate should throw error if ingredientsId is empty", () => {
    const dto = new AddRecipeDTO("Recipe", [], "Description", "Step", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "La recette doit contenir au moins un ingrédient.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddRecipeDTO: validate should throw error if description is empty", () => {
    const dto = new AddRecipeDTO("Recipe", ["ingredient1"], "", "Step", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "La recette doit contenir une description.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddRecipeDTO: validate should throw error if step is empty", () => {
    const dto = new AddRecipeDTO("Recipe", ["ingredient1"], "Description", "", ["category1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "La recette doit contenir une étape.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddRecipeDTO: validate should throw error if categoriesId is empty", () => {
    const dto = new AddRecipeDTO("Recipe", ["ingredient1"], "Description", "Step", [], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "La recette doit contenir au moins une catégorie.");
        } else {
            throw error;
        }
    }
});

Deno.test("AddRecipeDTO: validate should throw error if time is negative", () => {
    const dto = new AddRecipeDTO("Recipe", ["ingredient1"], "Description", "Step", ["category1"], -5);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "Le temps de préparation doit être positif.");
        } else {
            throw error;
        }
    }
});
