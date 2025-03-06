import { assertEquals, assertRejects } from "@std/assert";
import { db } from "./db.ts";
import { IngredientRepository } from "./repositories/ingredient.repository.ts";
import { Ingredient } from "./models/ingredient.model.ts";

Deno.test("IngredientRepository - getAllIngredients() should return ingredients", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const result = await repo.getAllIngredients();
    
    assertEquals(Array.isArray(result), true);
    await db.client.close();
});

Deno.test("IngredientRepository - getIngredientById() should return ingredient", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Tomato",
        categoriesId: ["67c89efda2060a9189da5e95"],
    };

    const createdIngredient = await repo.createIngredient(ingredient);
    const fetchedIngredient = await repo.getIngredientById(createdIngredient.id);

    assertEquals(fetchedIngredient.name, "Tomato");
    await db.client.close();
});

Deno.test("IngredientRepository - getIngredientById() should throw 404 if not found", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const invalidId = "nonexistentid";

    await assertRejects(
        async () => {
            await repo.getIngredientById(invalidId);
        },
        Error
    );
    await db.client.close();
});

Deno.test("IngredientRepository - createIngredient() should insert ingredient", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Garlic",
        categoriesId: ["67c89efda2060a9189da5e95"],
    };

    const result = await repo.createIngredient(ingredient);
    
    assertEquals(result.name, "Garlic");
    await db.client.close();
});

Deno.test("IngredientRepository - updateIngredient() should update an ingredient", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Onion",
        categoriesId: ["67c89efda2060a9189da5e95"],
    };

    const createdIngredient = await repo.createIngredient(ingredient);
    
    createdIngredient.name = "Red Onion";
    const updatedIngredient = await repo.updateIngredient(createdIngredient.id, createdIngredient);

    assertEquals(updatedIngredient.name, "Red Onion");
    await db.client.close();
});

Deno.test("IngredientRepository - updateIngredient() should throw 404 if not found", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const invalidId = "nonexistentid";
    const ingredient: Ingredient = {
        id: invalidId,
        name: "Onion",
        categoriesId: [],
    };

    await assertRejects(
        async () => {
            await repo.updateIngredient(invalidId, ingredient);
        },
        Error
    );
    await db.client.close();
});

Deno.test("IngredientRepository - deleteIngredient() should delete an ingredient", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Carrot",
        categoriesId: [],
    };

    const createdIngredient = await repo.createIngredient(ingredient);

    await repo.deleteIngredient(createdIngredient.id);

    await assertRejects(
        async () => {
            await repo.getIngredientById(createdIngredient.id);
        },
        Error
    );

    await db.client.close();
});

Deno.test("IngredientRepository - getIngredientsByCategories() should return ingredients", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Pepper",
        categoriesId: ["67c89efda2060a9189da5e95"],
    };

     await repo.createIngredient(ingredient);
    const result = await repo.getIngredientsByCategories(["67c89efda2060a9189da5e95"]);

    assertEquals(result.length > 0, true);
    await db.client.close();
});

Deno.test("IngredientRepository - getIngredientsByName() should return ingredients by name", async () => {
    await db.connect();

    const repo = new IngredientRepository();
    const ingredient: Ingredient = {
        id: "",
        name: "Basil",
        categoriesId: [],
    };

    await repo.createIngredient(ingredient);
    const result = await repo.getIngredientsByName("Basil");
    assertEquals(result[0].name, "Basil");

    await db.client.close();
});
