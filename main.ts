import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { errorMiddleware, logError } from "./middlewares/errorMiddleware.ts";
import { db } from "./db.ts";
import { recipeController } from "./controller/recipe.controller.ts";

try {
  if (import.meta.main) {

    const app = new Application();
    const router = new Router();
    await db.connect();

    // const Reciperouter = new Router();
    
    router.get('/recipes', recipeController.getAllRecipes);
    router.get('/recipes/:id', recipeController.getRecipeById);
    router.post('/recipes', recipeController.createRecipe);
    router.put('/recipes/:id', recipeController.updateRecipe);
    router.delete('/recipes/:id', recipeController.deleteRecipe);
    
    app.use(errorMiddleware);
    app.use(router.routes());
    app.use(router.allowedMethods());

    console.log("Serveur démarré sur http://localhost:8000");
    await app.listen({ port: 8000 });
  }

} catch (error: any) {
  logError(`${error.stack}`, 'CRITICAL');
}
