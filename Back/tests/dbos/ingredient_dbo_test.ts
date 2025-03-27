import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { IngredientDBO } from "../../dbos/ingredient.dbo.ts";
import { Ingredient } from "../../models/ingredient.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("IngredientDBO: should correctly create instance with valid ObjectId and categoriesId", () => {
    const id = new ObjectId().toString();
    const categoryIds = [new ObjectId().toString(), new ObjectId().toString()];

    const ingredientDBO = new IngredientDBO(id, "Tomato", categoryIds);

    assertEquals(ingredientDBO._id?.toString(), id);
    assertEquals(ingredientDBO.name, "Tomato");
    assertEquals(ingredientDBO.categoriesId.map(id => id.toString()), categoryIds);
});

Deno.test("IngredientDBO: should correctly create instance with null ObjectId", () => {
    const categoryIds = [new ObjectId().toString()];

    const ingredientDBO = new IngredientDBO(null, "Salt", categoryIds);

    assertEquals(ingredientDBO._id, null);
    assertEquals(ingredientDBO.name, "Salt");
    assertEquals(ingredientDBO.categoriesId.map(id => id.toString()), categoryIds);
});

Deno.test("IngredientDBO: fromIngredient should correctly convert Ingredient to IngredientDBO", () => {
    const categoryIds = [new ObjectId().toString(), new ObjectId().toString()];
    const ingredient: Ingredient = { id: new ObjectId().toString(), name: "Garlic", categories: categoryIds };

    const ingredientDBO = IngredientDBO.fromIngredient(ingredient);

    assertEquals(ingredientDBO._id?.toString(), ingredient.id);
    assertEquals(ingredientDBO.name, ingredient.name);
    assertEquals(ingredientDBO.categoriesId.map(id => id.toString()), categoryIds);
});

Deno.test("IngredientDBO: toIngredient should correctly convert IngredientDBO to Ingredient", () => {
    const id = new ObjectId().toString();
    const categoryIds = [new ObjectId().toString()];
    const ingredientDBO = new IngredientDBO(id, "Pepper", categoryIds);

    const ingredient = IngredientDBO.toIngredient(ingredientDBO);

    assertEquals(ingredient.id, id);
    assertEquals(ingredient.name, ingredientDBO.name);
    assertEquals(ingredient.categories, categoryIds);
});

Deno.test("IngredientDBO: toIngredient should throw error if _id is null", () => {
    const categoryIds = [new ObjectId().toString()];
    const ingredientDBO = new IngredientDBO(null, "Sugar", categoryIds);

    try {
        IngredientDBO.toIngredient(ingredientDBO);
        throw new Error("Test failed: Expected error but none was thrown.");
    } catch (error) {
        assertEquals(error instanceof TypeError, true);
    }
});
