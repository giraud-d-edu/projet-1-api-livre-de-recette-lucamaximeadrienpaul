import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { RecipeDBO } from "../../dbos/recipe.dbo.ts";
import { Recipe } from "../../models/recipe.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("RecipeDBO: should correctly create instance with valid ObjectId", () => {
    const id = new ObjectId().toString();
    const ingredientIds = [new ObjectId().toString(), new ObjectId().toString()];
    const categoryIds = [new ObjectId().toString(), new ObjectId().toString()];

    const recipeDBO = new RecipeDBO(id, "Pizza", ingredientIds, "A tasty pizza", "Step 1: Prepare", categoryIds, 30, "Italy", "image.png");

    assertEquals(recipeDBO._id?.toString(), id);
    assertEquals(recipeDBO.name, "Pizza");
    assertEquals(recipeDBO.ingredientsId.map(id => id.toString()), ingredientIds);
    assertEquals(recipeDBO.description, "A tasty pizza");
    assertEquals(recipeDBO.step, "Step 1: Prepare");
    assertEquals(recipeDBO.categoriesId.map(id => id.toString()), categoryIds);
    assertEquals(recipeDBO.time, 30);
    assertEquals(recipeDBO.origin, "Italy");
    assertEquals(recipeDBO.image, "image.png");
});

Deno.test("RecipeDBO: should correctly create instance with null ObjectId", () => {
    const ingredientIds = [new ObjectId().toString()];
    const categoryIds = [new ObjectId().toString()];

    const recipeDBO = new RecipeDBO(null, "Pasta", ingredientIds, "Italian pasta", "Step 1: Cook", categoryIds, 20, "Italy");

    assertEquals(recipeDBO._id, null);
    assertEquals(recipeDBO.name, "Pasta");
    assertEquals(recipeDBO.ingredientsId.map(id => id.toString()), ingredientIds);
    assertEquals(recipeDBO.categoriesId.map(id => id.toString()), categoryIds);
    assertEquals(recipeDBO.time, 20);
    assertEquals(recipeDBO.origin, "Italy");
    assertEquals(recipeDBO.image, null);
});

Deno.test("RecipeDBO: fromRecipe should correctly convert Recipe to RecipeDBO", () => {
    const ingredientIds = [new ObjectId().toString(), new ObjectId().toString()];
    const categoryIds = [new ObjectId().toString()];
    const recipe: Recipe = {
        id: new ObjectId().toString(),
        name: "Soup",
        ingredients: ingredientIds,
        description: "A warm soup",
        step: "Step 1: Boil",
        categories: categoryIds,
        time: 15,
        origin: "France",
        image: "soup.png"
    };

    const recipeDBO = RecipeDBO.fromRecipe(recipe);

    assertEquals(recipeDBO._id?.toString(), recipe.id);
    assertEquals(recipeDBO.name, recipe.name);
    assertEquals(recipeDBO.ingredientsId.map(id => id.toString()), ingredientIds);
    assertEquals(recipeDBO.categoriesId.map(id => id.toString()), categoryIds);
    assertEquals(recipeDBO.time, recipe.time);
    assertEquals(recipeDBO.origin, recipe.origin);
    assertEquals(recipeDBO.image, recipe.image);
});

Deno.test("RecipeDBO: toRecipe should correctly convert RecipeDBO to Recipe", () => {
    const id = new ObjectId().toString();
    const ingredientIds = [new ObjectId().toString()];
    const categoryIds = [new ObjectId().toString()];
    const recipeDBO = new RecipeDBO(id, "Burger", ingredientIds, "A delicious burger", "Step 1: Grill", categoryIds, 10, "USA", "burger.png");

    const recipe = RecipeDBO.toRecipe(recipeDBO);

    assertEquals(recipe.id, id);
    assertEquals(recipe.name, recipeDBO.name);
    assertEquals(recipe.ingredients, ingredientIds);
    assertEquals(recipe.categories, categoryIds);
    assertEquals(recipe.time, recipeDBO.time);
    assertEquals(recipe.origin, recipeDBO.origin);
    assertEquals(recipe.image, recipeDBO.image);
});

Deno.test("RecipeDBO: toRecipe should throw error if _id is null", () => {
    const ingredientIds = [new ObjectId().toString()];
    const categoryIds = [new ObjectId().toString()];
    const recipeDBO = new RecipeDBO(null, "Tacos", ingredientIds, "Tasty tacos", "Step 1: Assemble", categoryIds, 5, "Mexico", "tacos.png");

    try {
        RecipeDBO.toRecipe(recipeDBO);
        throw new Error("Test failed: Expected error but none was thrown.");
    } catch (error) {
        assertEquals(error instanceof TypeError, true);
    }
});
