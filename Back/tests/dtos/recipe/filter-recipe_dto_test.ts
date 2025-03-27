import { FilterRecipeDTO } from "../../../dtos/recipe/filter-recipe.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("FilterRecipeDTO: validate should pass with valid input", () => {
    const dto = new FilterRecipeDTO("Valid Recipe", ["123456789012345678901234"], ["123456789012345678901234"], 30);
    try {
        dto.validate();
    } catch (error) {
        throw new Error("Test failed: Validation threw an error.");
    }
});

Deno.test("FilterRecipeDTO: validate should throw error if name exceeds 250 characters", () => {
    const dto = new FilterRecipeDTO("a".repeat(251), ["category1"], ["ingredient1"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "Le nom de la recette ne doit pas dépasser 250 caractères");
        } else {
            throw error;
        }
    }
});

Deno.test("FilterRecipeDTO: validate should throw error if categoriesId are invalid", () => {
    const dto = new FilterRecipeDTO("Recipe", ["invalidCategoryId"], ["ingredient1"], 30);
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

Deno.test("FilterRecipeDTO: validate should throw error if ingredientId are invalid", () => {
    const dto = new FilterRecipeDTO("Recipe", ["aaaaaaaaaaaaaaaaaaaaaaaa"], ["invalidIngredientId"], 30);
    try {
        dto.validate();
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, "les id des ingrédients doivent être une chaîne de 24 caractères hexadécimaux");
        } else {
            throw error;
        }
    }
});
