import { assertEquals, assertRejects } from "@std/assert";
import { RecipeRepository } from "../repositories/recipe.repository.ts";
import { db } from "../db.ts";
import { Recipe } from "../models/recipe.model.ts";

Deno.test("RecipeRepository - createRecipe() should insert a recipe", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const recipe: Recipe = {
    id: "",
    name: "Pâtes Carbonara",
    ingredientsId: [],
    description: "Recette italienne classique",
    step: "1. Faire cuire les pâtes\n2. Mélanger les oeufs et le fromage\n3. Mélanger les pâtes et la sauce\n4. Ajouter le lard",
    categoriesId: [],
    time: 30,
    origin: "Italie"
  };

  const result = await repo.createRecipe(recipe);
  assertEquals(result.name, "Pâtes Carbonara");
  await db.client.close();
});
Deno.test("RecipeRepository - getrecipe() should return a array of recipe", async () => {
  await db.connect();
  const repo = new RecipeRepository();
  const recipe: Recipe = {
    id: "",
    name: "Pâtes C",
    ingredientsId: ["67c8a4bb9fccb7ff8b16fe79","67c8a4bb9fccb7ff8b16fe7a"],
    description: "Recette italienne classique",
    step: "1. Faire cuire les pâtes\n2. Mélanger les oeufs et le fromage\n3. Mélanger les pâtes et la sauce\n4. Ajouter le lard",
    categoriesId: ["67c89efda2060a9189da5e97","67c89efda2060a9189da5e99"],
    time: 30,
    origin: "Italie"
  };
  await repo.createRecipe(recipe);

  const filters = {
    name: "pâtes",
    ingredientsId: ["67c8a4bb9fccb7ff8b16fe79", "67c8a4bb9fccb7ff8b16fe7a"],
    categoriesId: ["67c89efda2060a9189da5e97", "67c89efda2060a9189da5e99"],
    time: 30
};

const recipes = await repo.getRecipes(filters);
  assertEquals(recipes[0].name, "Pâtes C");
  await db.client.close();
});


Deno.test("RecipeRepository - getRecipeById() should return a recipe", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const newRecipe: Recipe = {
    id: "",
    name: "Pizza Margherita",
    ingredientsId: [],
    description: "Une pizza classique",
    step: "1. Préparer la pâte\n2. Ajouter la sauce tomate\n3. Ajouter la mozzarella\n4. Cuire au four",
    categoriesId: [],
    time: 45,
    origin: "Italie"
  };

  const insertedRecipe = await repo.createRecipe(newRecipe);
  const fetchedRecipe = await repo.getRecipeById(insertedRecipe.id);

  assertEquals(fetchedRecipe.name, "Pizza Margherita");
  await db.client.close();
});

Deno.test("RecipeRepository - getRecipeById() should throw 404 if not found", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  await assertRejects(
    async () => {
      await repo.getRecipeById("nonexistentid");
    },
    Error
  );
  await db.client.close();
});

Deno.test("RecipeRepository - updateRecipe() should update a recipe", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const newRecipe: Recipe = {
    id: "",
    name: "Pâtes Bolognese",
    ingredientsId: [],
    description: "Recette avec sauce bolognaise",
    step: "1. Cuire les pâtes\n2. Préparer la sauce\n3. Mélanger les pâtes et la sauce",
    categoriesId: [],
    time: 35,
    origin: "Italie"
  };

  const insertedRecipe = await repo.createRecipe(newRecipe);
  insertedRecipe.name = "Pâtes Bolognese Update";

  const updatedRecipe = await repo.updateRecipe(insertedRecipe.id, insertedRecipe);

  assertEquals(updatedRecipe.name, "Pâtes Bolognese Update");
  await db.client.close();
});

Deno.test("RecipeRepository - deleteRecipe() should delete a recipe", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const newRecipe: Recipe = {
    id: "",
    name: "Tiramisu",
    ingredientsId: [],
    description: "Dessert italien",
    step: "1. Préparer le café\n2. Mélanger les ingrédients\n3. Dresser le tiramisu",
    categoriesId: [],
    time: 60,
    origin: "Italie"
  };

  const insertedRecipe = await repo.createRecipe(newRecipe);
  await repo.deleteRecipe(insertedRecipe.id);

  await assertRejects(
    async () => {
      await repo.getRecipeById(insertedRecipe.id);
    },
    Error
  );

  await db.client.close();
});

