import { IngredientRepository } from "../../repositories/ingredient.repository.ts";
import { Ingredient } from "../../models/ingredient.model.ts";
import { db } from "../../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { assertEquals, assertRejects } from "https://deno.land/std/assert/mod.ts";
import { ErrorObject } from "../../models/error.model.ts";
import { CategoryRepository } from "../../repositories/category.repository.ts";

const mockIngredientsCollection = {
    find: (_: any) => ({ sort: () => ({ toArray: async () => [] }) }),
    findOne: async (filter: any) => {
        if (filter._id.toString() === "67e5556bf93a490d8100f182") {
            return {
                _id: new ObjectId("67e5556bf93a490d8100f182"),
                name: "Sugar",
                categoriesId: [new ObjectId().toString()]
            };
        }
        return null;
    },
    insertOne: async (_: any) => {
        return { toString: () => "67e5556bf93a490d8100f182" };
    },
    updateOne: async (_: any, __: any) => ({ matchedCount: 1 }),
    deleteOne: async (_: any) => ({ deletedCount: 1 }),
};


db.getIngredientsCollection = () => mockIngredientsCollection as any;

const mockCategoryCollection = {
    findOne: async (_: any) => {

        if (_._id.toString() ===  new ObjectId().toString()) {
            return null;
        }
        return { _id: new ObjectId(), name: "Spices" };
    },
};

db.getCategoryCollection = () => mockCategoryCollection as any;


const mockCategoryRepository = {
    getCategoriesByIdArray: async (ids: string[]) => {
      if (ids.includes("nonexistent_category_id")) {
        return [];
      }
  
    
      return ids.map(id => ({
        id: id,
        name: "Spices",
        Type: "Herbs"
      }));
    },
  };
  
  CategoryRepository.prototype.getCategoriesByIdArray = mockCategoryRepository.getCategoriesByIdArray;
  

CategoryRepository.prototype.getCategoriesByIdArray = mockCategoryRepository.getCategoriesByIdArray;

const ingredientRepo = new IngredientRepository();


Deno.test("IngredientRepository: createIngredient should return created ingredient", async () => {
const ingredient: Ingredient = { id: new ObjectId().toString(), name: "Sugar", categories: [new ObjectId().toString()] };
const createdIngredient = await ingredientRepo.createIngredient(ingredient);

assertEquals(createdIngredient.name, "Sugar");

});


Deno.test("IngredientRepository: updateIngredient should return updated ingredient", async () => {
const ingredient: Ingredient = { id: "67e5556bf93a490d8100f182", name: "Sugar", categories: [] };
const updatedIngredient = await ingredientRepo.updateIngredient(ingredient.id!, ingredient);
assertEquals(updatedIngredient.name, "Sugar");

});


Deno.test("IngredientRepository: updateIngredient should throw error if ingredient does not exist", async () => {
    const id = new ObjectId().toString();
    mockIngredientsCollection.updateOne = async () => ({ matchedCount: 0 });

    try {
        await ingredientRepo.updateIngredient(id, { id: id, name: "Nonexistent Ingredient", categories: [] });
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, `Ingrédient avec l'ID ${id} non trouvé`);
        } else {
            throw error;
        }
    }
});

Deno.test("IngredientRepository: deleteIngredient should delete ingredient successfully", async () => {
    const id = "67e5556bf93a490d8100f182";
    await ingredientRepo.deleteIngredient(id);
});

Deno.test("IngredientRepository: deleteIngredient should throw error if ingredient does not exist", async () => {
    const id = new ObjectId().toString();
    mockIngredientsCollection.deleteOne = async () => ({ deletedCount: 0 });

    try {
        await ingredientRepo.deleteIngredient(id);
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, `Ingrédient avec l'ID ${id} non trouvé`);
        } else {
            throw error;
        }
    }
});
Deno.test("IngredientRepository: getIngredientsByCategories should return empty array if no ingredients found", async () => {
    const ingredients = await ingredientRepo.getIngredientsByCategories([new ObjectId().toString()]);
    assertEquals(ingredients, []);
});
Deno.test("IngredientRepository: getIngredientsByName should return empty array if no ingredients found", async () => {
    const ingredients = await ingredientRepo.getIngredientsByName("Nonexistent");
    assertEquals(ingredients, []);
});
Deno.test("IngredientRepository: getIngredientsByIdArray should return empty array if no ingredients found", async () => {
    const ingredients = await ingredientRepo.getIngredientsByIdArray([new ObjectId().toString()]);
    assertEquals(ingredients, []);
});
