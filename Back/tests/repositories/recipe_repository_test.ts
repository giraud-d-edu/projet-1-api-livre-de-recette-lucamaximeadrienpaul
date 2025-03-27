import { RecipeRepository } from "../../repositories/recipe.repository.ts";
import { Recipe } from "../../models/recipe.model.ts";
import { db } from "../../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { ErrorObject } from "../../models/error.model.ts";
import { IngredientRepository } from "../../repositories/ingredient.repository.ts";
import { CategoryRepository } from "../../repositories/category.repository.ts";

const mockIngredientsCollection = {
    findOne: async (filter: any) => {
        if (filter._id) {
            return { _id: filter._id, name: "Sugar" };
        }
        return null; 
    },
    collection: () => mockIngredientsCollection, 
};


const mockRecipesCollection = {
    find: (_: any) => ({
        sort: () => ({
            toArray: async () => [] 
        })
    }),
    findOne: async (filter: any) => {
        if (filter._id.toString() === "67e5556bf93a490d8100f182") {
            return {
                _id: new ObjectId("67e5556bf93a490d8100f182"),
                name: "Recipe1",
                categoriesId: [new ObjectId().toString()],
                ingredientsId: [new ObjectId().toString()],
                time: 30
            };
        }
        return null;
    },
    insertOne: async (_: any) => {
        return { toString: () => "67e5556bf93a490d8100f182" };
    },
    updateOne: async (filter: any, updateDoc: any) => {
        if (filter._id.toString() === "67e5556bf93a490d8100f182") {
            return { matchedCount: 1, modifiedCount: 1 }; 
        }
        return { matchedCount: 0, modifiedCount: 0 };
    },
    deleteOne: async (_: any) => ({ deletedCount: 1 }),
};


const mockCategoryCollection = {
    findOne: async (filter: any) => {
        if (filter._id) {
            return { _id: filter._id, name: "Spices" };
        }
        return null; 
    },
    collection: () => mockCategoryCollection,
};


db.getIngredientsCollection = () => mockIngredientsCollection as any;
db.getCategoryCollection = () => mockCategoryCollection as any;
db.getRecipesCollection = () => mockRecipesCollection as any;


const mockCategoryRepository = {
    getCategoriesByIdArray: async (ids: string[]) => {
        return ids.map(id => ({ id: id, name: "Spices", Type: "Herbs" }));
    }
};

CategoryRepository.prototype.getCategoriesByIdArray = mockCategoryRepository.getCategoriesByIdArray;

const mockIngredientRepository = {
    getIngredientsByIdArray: async (ids: string[]) => {
        return ids.map(id => ({ id: id, name: "Sugar", categories: [] }));
    }
};

IngredientRepository.prototype.getIngredientsByIdArray = mockIngredientRepository.getIngredientsByIdArray;

const recipeRepo = new RecipeRepository();

Deno.test("RecipeRepository: createRecipe should return created recipe", async () => {
    const recipe: Recipe = {
        id: new ObjectId().toString(), name: "Recipe1", categories: [new ObjectId().toString()], ingredients: [new ObjectId().toString()], time: 30,
        description: "",
        step: "",
        origin: ""
    };
    const createdRecipe = await recipeRepo.createRecipe(recipe);
    assertEquals(createdRecipe.name, "Recipe1");
});

Deno.test("RecipeRepository: updateRecipe should throw error if recipe does not exist", async () => {
    const id = new ObjectId().toString();
    mockRecipesCollection.updateOne = async () => ({ matchedCount: 0, modifiedCount: 0 });

    try {
        await recipeRepo.updateRecipe(id, {
            id: id, name: "NonexistentRecipe", categories: [], ingredients: [], time: 30,
            description: "",
            step: "",
            origin: ""
        });
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, `Recette avec l'ID ${id} non trouvée`);
        } else {
            throw error;
        }
    }
});


Deno.test("RecipeRepository: getRecipeById should return recipe by id", async () => {
    const recipe = await recipeRepo.getRecipeById("67e5556bf93a490d8100f182");
    assertEquals(recipe.name, "Recipe1");
});

Deno.test("RecipeRepository: getRecipeById should throw error if recipe not found", async () => {
    const id = new ObjectId().toString();
    try {
        await recipeRepo.getRecipeById(id);
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, `Recette avec l'ID ${id} non trouvée`);
        } else {
            throw error;
        }
    }
});
