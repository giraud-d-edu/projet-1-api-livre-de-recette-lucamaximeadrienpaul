import {  CategoryDTO } from "../../../dtos/category/category.dto.ts";
import { assertEquals } from "https://deno.land/std/assert/assert_equals.ts";

const fakeCategoryModel = {
    id: "000000000000000000000001",
    name: "Test Category",
    Type: "Test Type",
  };

  Deno.test("CategoryDTO: fromModel should transform a model into a DTO", () => {
    const dto = CategoryDTO.fromModel(fakeCategoryModel);
    assertEquals(dto.id, fakeCategoryModel.id);
    assertEquals(dto.name, fakeCategoryModel.name);
    assertEquals(dto.Type, fakeCategoryModel.Type);
  });