import { CategoryRepository } from "../../repositories/category.repository.ts";
import { Category } from "../../models/category.model.ts";
import { db } from "../../db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { ErrorObject } from "../../models/error.model.ts";

const mockCategoryCollection = {
    find: (_: any) => ({ sort: () => ({ toArray: async () => [] }) }),
    findOne: async (_: any) => null,
    insertOne: async (_: any) => new ObjectId(),
    updateOne: async (_: any, __: any) => ({ matchedCount: 1 }),
    deleteOne: async (_: any) => ({ deletedCount: 1 }),
};

db.getCategoryCollection = () => mockCategoryCollection as any;

const categoryRepo = new CategoryRepository();

Deno.test("CategoryRepository: getAllCategories should return empty array if no categories found", async () => {
    const categories = await categoryRepo.getAllCategories();
    assertEquals(categories, []);
});

Deno.test("CategoryRepository: getCategoryByName should throw error if no category found", async () => {
    try {
        await categoryRepo.getCategoryByName("Nonexistent");
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Bad Request");
            assertEquals(error.message, "Aucune catégorie trouvée pour le nom 'Nonexistent' et le type 'tous'");
        } else {
            throw error;
        }
    }
});

Deno.test("CategoryRepository: getCategoryById should throw error if category not found", async () => {
    const id = new ObjectId().toString();
    try {
        await categoryRepo.getCategoryById(id);
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, `Catégorie avec l'ID ${id} non trouvée`);
        } else {
            throw error;
        }
    }
});

Deno.test("CategoryRepository: createCategory should return created category", async () => {
    const category: Category = { id: new ObjectId().toString(), name: "Dessert", Type: "Food" };
    const createdCategory = await categoryRepo.createCategory(category);

    assertEquals(createdCategory.name, category.name);
    assertEquals(createdCategory.Type, category.Type);
    assertEquals(typeof createdCategory.id, "string");
});

Deno.test("CategoryRepository: updateCategory should return updated category", async () => {
    const category: Category = { id: new ObjectId().toString(), name: "New Name", Type: "Food" };
    const updatedCategory = await categoryRepo.updateCategory(category.id!, category);

    assertEquals(updatedCategory.name, category.name);
    assertEquals(updatedCategory.Type, category.Type);
});

Deno.test("CategoryRepository: updateCategory should throw error if category not found", async () => {
    mockCategoryCollection.updateOne = async () => ({ matchedCount: 0 });
    const id = new ObjectId().toString();
    try {
        await categoryRepo.updateCategory(id, { id: id, name: "Nonexistent", Type: "Food" });
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, `Catégorie avec l'ID ${id} non trouvée`);
        } else {
            throw error;
        }
    }
});

Deno.test("CategoryRepository: deleteCategory should delete category successfully", async () => {
    await categoryRepo.deleteCategory(new ObjectId().toString());
});

Deno.test("CategoryRepository: deleteCategory should throw error if category not found", async () => {
    mockCategoryCollection.deleteOne = async () => ({ deletedCount: 0 });
    const id = new ObjectId().toString();
    try {
        await categoryRepo.deleteCategory(id);
        throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
        if (error instanceof ErrorObject) {
            assertEquals(error.status, "Not Found");
            assertEquals(error.message, `Catégorie avec l'ID ${id} non trouvée`);
        } else {
            throw error;
        }
    }
});

Deno.test("CategoryRepository: getCategoriesByIdArray should return empty array if no categories found", async () => {
    const categories = await categoryRepo.getCategoriesByIdArray([new ObjectId().toString()]);
    assertEquals(categories, []);
});
