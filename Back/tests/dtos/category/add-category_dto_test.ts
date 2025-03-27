import { AddCategoryDTO } from "../../../dtos/category/add-category.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

  Deno.test("AddCategoryDTO: fromRequest should create a valid instance", () => {
    const data = { name: "Category A", Type: "Type A" };
    const dto = AddCategoryDTO.fromRequest(data);
    assertEquals(dto.name, "Category A");
    assertEquals(dto.Type, "Type A");
  });
  
  Deno.test("AddCategoryDTO: validate should pass with valid data", () => {
    const dto = new AddCategoryDTO("Category A", "Type A");
    dto.validate();
  });
  
Deno.test("AddCategoryDTO: should throw error if name is empty", () => {
  const data = { Type: "Type 1" };
  
  try {
    const categoryDTO = AddCategoryDTO.fromRequest(data);
    categoryDTO.validate();
    throw new Error("Test failed: Validation did not throw error.");
  } catch (error) {
    if (error instanceof ErrorObject) {
      assertEquals(error.status, "Not Found");
      assertEquals(error.message, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    } else {
      throw error;
    }
  }
});
Deno.test("AddCategoryDTO: validate should throw error for too long name", () => {
  const longName = "a".repeat(256);
  try{
    const dto = new AddCategoryDTO(longName, "Type A");
    dto.validate();
    throw new Error("Test failed: Validation did not throw error.");
  } catch (error) {
    if (error instanceof ErrorObject) {
      assertEquals(error.status, "Not Found");
      assertEquals(error.message, "Le nom ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    } else {
      throw error;
    }
  }

});

Deno.test("AddCategoryDTO: validate should throw error for empty Type", () => {
  try{
    const dto = new AddCategoryDTO("Category A", "");
    dto.validate();
    throw new Error("Test failed: Validation did not throw error.");
  }
  catch (error) {
    if (error instanceof ErrorObject) {
      assertEquals(error.status, "Not Found");
      assertEquals(error.message, "Le Type ne doit pas être vide ou ne doit pas excéder 255 caractères.");
    } else {
      throw error;
    }
  }
});
