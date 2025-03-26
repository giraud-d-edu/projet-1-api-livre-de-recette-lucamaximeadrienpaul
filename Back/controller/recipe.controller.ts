import { RecipeService } from '../services/recipe.service.ts';
import { FilterRecipeDTO } from '../dtos/recipe/filter-recipe.dto.ts';
import { AddRecipeDTO } from "../dtos/recipe/add-recipe.dto.ts";
import { UpdateRecipeDTO } from "../dtos/recipe/update-recipe.dto.ts";
import { checkId } from "./shared.controller.ts";

export class RecipeController {

    private readonly recipeService: RecipeService = new RecipeService();

    getAllRecipes = async ({ request, response }: { request: any, response: any }) => {
        const queryParams = new URL(request.url).searchParams;
        
        const filter: FilterRecipeDTO = FilterRecipeDTO.fromRequest(Object.fromEntries(queryParams));
        filter.validate();
        const recipe = await this.recipeService.getRecipes(filter);
        
        response.body = recipe;
        response.status = 200;
    };
    

    getRecipeById = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        const recipe = await this.recipeService.getRecipeById(id);
        response.body = recipe;
        response.status = 200;
    }

    createRecipe = async ({ request, response }: { request: any, response: any }) => {
        const body = await request.body;
        console.log("Body Type:", request.body.toString());
        if ( request.body.type() !== "form-data") {
            response.status = 400;
            response.body = { error: "Invalid content type. Expected form-data." };
            return;
        }
    
        try {
            const formData = await body.formData();
            const name = formData.get("name") as string;
            const description = formData.get("description") as string;
            const step = formData.get("step") as string;
            const time = formData.get("time") as string;
            const origin = formData.get("origin") as string;
            const ingredientsId = formData.getAll("ingredientsId") as string[];
            const categoriesId = formData.getAll("categoriesId") as string[];
            const image = formData.get("image");

            if (image && image instanceof File) {
                console.log("Image file:", image);
            }

            const recipeData = AddRecipeDTO.fromRequest({
                name,
                description,
                step,
                time: Number(time),
                origin,
                ingredientsId,
                categoriesId,
                image
            });
    
            recipeData.validate();
            const recipe = await this.recipeService.createRecipe(recipeData);
            response.body = recipe;
            response.status = 201;
        } catch (error) {
            console.error("Error processing form data:", error);
            response.status = 500;
            response.body = { error: "An error occurred while processing the form data." };
        }
    };
    

    updateRecipe = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
        const id = params.id;
        checkId(id);
        
        const body = await request.body();
        
        if (request.body.type() !== "form-data") {
            response.status = 400;
            response.body = { error: "Invalid content type. Expected form-data." };
            return;
        }
    
        try {

            const formData = await body.formData();

            const name = formData.get("name") as string;
            const description = formData.get("description") as string;
            const step = formData.get("step") as string;
            const time = formData.get("time") as string;
            const origin = formData.get("origin") as string;

            const ingredientsId = formData.getAll("ingredientsId") as string[];
            const categoriesId = formData.getAll("categoriesId") as string[];
            const image = formData.get("image");
    
            if (image && image instanceof File) {
                console.log("Image file:", image);
            }
            const updatedRecipeData = UpdateRecipeDTO.fromRequest({
                id,
                name,
                description,
                step,
                time: Number(time),
                origin,
                ingredientsId,
                categoriesId,
                image
            });
            updatedRecipeData.validate();
            const updatedRecipe = await this.recipeService.updateRecipe(updatedRecipeData);
            response.body = updatedRecipe;
            response.status = 200;
        } catch (error) {
            console.error("Error processing form data:", error);
            response.status = 500;
            response.body = { error: "An error occurred while processing the form data." };
        }
    };
    

    deleteRecipe = async ({ params, response }: { params: { id: string }, response: any }) => {
        const id = params.id;
        checkId(id);
        await this.recipeService.deleteRecipe(id);
        response.status = 204;
    }

}