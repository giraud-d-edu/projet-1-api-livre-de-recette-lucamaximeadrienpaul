import { UpdateCategoryDTO } from "../../../dtos/category/update-category.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("UpdateCategoryDTO: should throw error if name exceeds 255 characters", () => {
  const data = { id: "123", name: "a".repeat(256), Type: "Type 1" };
  
  try {
    const updateCategoryDTO = UpdateCategoryDTO.fromRequest(data);
    updateCategoryDTO.validate();
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

Deno.test("UpdateCategoryDTO: should throw error if Type exceeds 255 characters", () => {
    const data = { id: "123", name: "Valid Name", Type: "b".repeat(256) };
    
    try {
      const updateCategoryDTO = UpdateCategoryDTO.fromRequest(data);
      updateCategoryDTO.validate();
      throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
      if (error instanceof ErrorObject) {
        assertEquals(error.status, "Not Found");
        assertEquals(error.message, "Le Type ne doit pas être vide ou ne doit pas excéder 255 caractères.");
      } else {
        throw error;
      }
    }
  });
