import { FilterCategoryDTO } from "../../../dtos/category/filter-category.dto.ts";
import { ErrorObject } from "../../../models/error.model.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("FilterCategoryDTO: should throw error if type is not a string", () => {
  const data = { type: 123 };
  
  try {
    const filterCategoryDTO = FilterCategoryDTO.fromRequest(data);
    filterCategoryDTO.validate();
    throw new Error("Test failed: Validation did not throw error.");
  } catch (error) {
    if (error instanceof ErrorObject) {
      assertEquals(error.status, "Bad Request");
      assertEquals(error.message, "Le type de catégorie doit être une chaîne de caractères valide.");
    } else {
      throw error;
    }
  }
});
Deno.test("FilterCategoryDTO: fromRequest should create instance with type", () => {
    const data = { type: "Type A" };
    const dto = FilterCategoryDTO.fromRequest(data);
    assertEquals(dto.type, "Type A");
  });
  
  Deno.test("FilterCategoryDTO: fromRequest should create instance with null when type is not provided", () => {
    const data = {};
    const dto = FilterCategoryDTO.fromRequest(data);
    assertEquals(dto.type, null);
  });
  
  Deno.test("FilterCategoryDTO: validate should pass with valid type", () => {
    const dto = new FilterCategoryDTO("Type A");
    dto.validate();
  });
  
  Deno.test("FilterCategoryDTO: validate should throw error when type is not a string", () => {
    const dto = new FilterCategoryDTO(123 as unknown as string);
    try {
      dto.validate();
      throw new Error("Test failed: Validation did not throw error.");
    } catch (error) {
      if (error instanceof ErrorObject) {
        assertEquals(error.status, "Bad Request");
        assertEquals(error.message, "Le type de catégorie doit être une chaîne de caractères valide.");
      } else {
        throw error;
      }
    }
  });
  