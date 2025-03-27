import { ObjectId } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { CategoryDBO } from "../../dbos/category.dbo.ts";
import { Category } from "../../models/category.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("CategoryDBO: should correctly create instance with valid ObjectId", () => {
    const id = new ObjectId().toString();
    const categoryDBO = new CategoryDBO(id, "Dessert", "Food");

    assertEquals(categoryDBO._id?.toString(), id);
    assertEquals(categoryDBO.name, "Dessert");
    assertEquals(categoryDBO.Type, "Food");
});

Deno.test("CategoryDBO: should correctly create instance with null ObjectId", () => {
    const categoryDBO = new CategoryDBO(null, "Drinks", "Beverage");

    assertEquals(categoryDBO._id, null);
    assertEquals(categoryDBO.name, "Drinks");
    assertEquals(categoryDBO.Type, "Beverage");
});

Deno.test("CategoryDBO: fromCategory should correctly convert Category to CategoryDBO", () => {
    const category: Category = { id: new ObjectId().toString(), name: "Soup", Type: "Food" };
    const categoryDBO = CategoryDBO.fromCategory(category);

    assertEquals(categoryDBO._id?.toString(), category.id);
    assertEquals(categoryDBO.name, category.name);
    assertEquals(categoryDBO.Type, category.Type);
});

Deno.test("CategoryDBO: toCategory should correctly convert CategoryDBO to Category", () => {
    const id = new ObjectId().toString();
    const categoryDBO = new CategoryDBO(id, "Fast Food", "Food");
    const category = CategoryDBO.toCategory(categoryDBO);

    assertEquals(category.id, id);
    assertEquals(category.name, categoryDBO.name);
    assertEquals(category.Type, categoryDBO.Type);
});

Deno.test("CategoryDBO: toCategory should throw error if _id is null", () => {
    const categoryDBO = new CategoryDBO(null, "Bakery", "Food");

    try {
        CategoryDBO.toCategory(categoryDBO);
        throw new Error("Test failed: Expected error but none was thrown.");
    } catch (error) {
        assertEquals(error instanceof TypeError, true);
    }
});
