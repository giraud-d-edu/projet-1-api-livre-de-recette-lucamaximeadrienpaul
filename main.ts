import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { errorMiddleware, logError } from "./middlewares/errorMiddleware.ts";
import { db } from "./db.ts";
import { recipeController } from "./controller/recipe.controller.ts";
import { ingredientController } from "./controller/ingredient.controller.ts";
import { Ingredientrouter } from "./routes/ingredient.route.ts";
import {Reciperouter }from "./routes/recipe.route.ts";
import {Categoryrouter } from "./routes/category.route.ts";

try {
  if (import.meta.main) {

    const app = new Application();
    const router = new Router();
    await db.connect();
    
    app.use(errorMiddleware);


    app.use(Ingredientrouter.routes());
    app.use(Ingredientrouter.allowedMethods());

    app.use(Reciperouter.routes());
    app.use(Reciperouter.allowedMethods());

    app.use(Categoryrouter.routes());
    app.use(Categoryrouter.allowedMethods());


    app.use(router.routes());
    app.use(router.allowedMethods());

    console.log("Serveur démarré sur http://localhost:8000");
    await app.listen({ port: 8000 });
  }

} catch (error: any) {
  logError(`${error.stack}`, 'CRITICAL');
}
