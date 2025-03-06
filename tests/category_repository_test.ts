import { assertEquals, assertRejects } from "@std/assert";
import { CategoryRepository } from "../repositories/category.repository.ts";
import { db } from "../db.ts";
import { Category } from "../models/category.model.ts";

Deno.test("CategoryRepository - createCategory() should insert a category", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  const category: Category = {
    id: "",
    name: "Desserts",
    Type: "Les meilleurs desserts",
  };

  const result = await repo.createCategory(category);

  assertEquals(result.name, "Desserts");
  await db.client.close();
});

Deno.test("CategoryRepository - getCategoryById() should return a category", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  const newCategory: Category = {
    id: "",
    name: "Boissons",
    Type: "Toutes les boissons",
  };

  const insertedCategory = await repo.createCategory(newCategory);
  const fetchedCategory = await repo.getCategoryById(insertedCategory.id);

  assertEquals(fetchedCategory.name, "Boissons");
  await db.client.close();
});

Deno.test("CategoryRepository - getCategoryById() should throw 500 if not found", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  
  const invalidId = "nonexistentid";

  await assertRejects(
    async () => {
      await repo.getCategoryById(invalidId);
    },
    Error
  );
  
  await db.client.close();
});


Deno.test("CategoryRepository - updateCategory() should update a category", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  const newCategory: Category = {
    id: "",
    name: "Snacks",
    Type: "Les meilleures snacks",
  };

  const insertedCategory = await repo.createCategory(newCategory);
  insertedCategory.name = "Snack Foods";

  const updatedCategory = await repo.updateCategory(insertedCategory.id, insertedCategory);

  assertEquals(updatedCategory.name, "Snack Foods");
  await db.client.close();
});

Deno.test("CategoryRepository - deleteCategory() should delete a category", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  const newCategory: Category = {
    id: "",
    name: "Petit Déjeuner",
    Type: "Les recettes du matin",
  };

  const insertedCategory = await repo.createCategory(newCategory);
  await repo.deleteCategory(insertedCategory.id);

  await assertRejects(
    async () => {
      await repo.getCategoryById(insertedCategory.id);
    },
    Error
  );

  await db.client.close();
});

Deno.test("CategoryRepository - getCategoryByName() should return categories by name", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  const category: Category = {
    id: "",
    name: "Végétarien",
    Type: "Recettes sans viande",
  };

  await repo.createCategory(category);
  const categories = await repo.getCategoryByName("Végétarien");

  assertEquals(categories[0].name, "Végétarien");
  await db.client.close();
});

Deno.test("CategoryRepository - getCategoryByName() should throw 404 if no category found", async () => {
  await db.connect();

  const repo = new CategoryRepository();
  await assertRejects(
    async () => {
      await repo.getCategoryByName("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    },
    Error
  );
  await db.client.close();
});
