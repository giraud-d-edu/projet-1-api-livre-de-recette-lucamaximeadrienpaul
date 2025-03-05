import { assertEquals, assertRejects } from "@std/assert";
import { RecipeRepository } from "./repositories/recipe.repository.ts";
import { db } from "./db.ts";
import { Recipe } from "./models/recipe.model.ts";
import { createHttpError } from "https://deno.land/x/oak@v17.1.4/deps.ts";

Deno.test("RecipeRepository - createRecipe() should insert a recipe", async () => {
  await db.connect(); // Assure-toi que la DB est connectée

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
    Error,
    "Erreur lors de la récupération de la recette"
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
  insertedRecipe.name = "Pâtes Bolognese Update";  // Modification du nom

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
    Error,
    "Erreur lors de la récupération de la recette"
  );

  await db.client.close();
});

Deno.test("RecipeRepository - searchRecipesByName() should return recipes by name", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const recipe: Recipe = {
    id: "",
    name: "Lasagne",
    ingredientsId: ["67c8a4bb9fccb7ff8b16fe79"],
    description: "Lasagne classique",
    step: "1. Préparer les couches\n2. Cuire au four",
    categoriesId: ["67c89efda2060a9189da5e97"],
    time: 60,
    origin: "Italie"
  };

  await repo.createRecipe(recipe);
  const recipes = await repo.searchRecipesByName("Lasagne");

  assertEquals(recipes[0].name, "Lasagne");
  await db.client.close();
});

Deno.test("RecipeRepository - searchRecipesByIngredient() should return recipes by ingredient", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const ingredientId = "67c8a4bb9fccb7ff8b16fe79";

  const recipes = await repo.searchRecipesByIngredient(ingredientId);

  await db.client.close();
});

Deno.test("RecipeRepository - searchRecipesByCategories() should return recipes by categories", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const categoryIds = ["67c89efda2060a9189da5e97"];

  const recipes = await repo.searchRecipesByCategories(categoryIds);

  await db.client.close();
});

Deno.test("RecipeRepository - searchRecipesByTime() should return recipes by time", async () => {
  await db.connect();

  const repo = new RecipeRepository();
  const maxTime = 60;

  const recipes = await repo.searchRecipesByTime(maxTime);

  await db.client.close();
});
