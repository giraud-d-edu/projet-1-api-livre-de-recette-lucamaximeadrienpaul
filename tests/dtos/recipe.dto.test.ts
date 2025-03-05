import { assertThrows, assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { validateAddRecipeDTO, validateUpdateRecipeDTO } from "../../dtos/recipe.dto.ts";

Deno.test("validateAddRecipeDTO - Validation ajout recette", () => {
    const data = { name: "Une recette", quantity: 1, unit: "kg" };
    const result = validateAddRecipeDTO(data);
    assertEquals(result, data);
});

Deno.test("validateAddRecipeDTO - Echec nb négatif quantité", () => {
    const data = { name: "Une recette", quantity: -1, unit: "" };
    assertThrows(() => validateAddRecipeDTO(data), Error, "La quantité doit être un nombre entier positif.");
});

Deno.test("validateUpdateRecipeDTO - Validation modif recette", () => {
    const data = { name: "Une recette modifiée", description: "Description", ingredients: [] };
    const result = validateUpdateRecipeDTO(data);
    assertEquals(result, data);
});

Deno.test("validateUpdateRecipeDTO - Echec modif champs vide recette", () => {
    const data = { name: "", description: "", ingredients: [{}] };
    assertThrows(() => validateUpdateRecipeDTO(data), Error, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
});