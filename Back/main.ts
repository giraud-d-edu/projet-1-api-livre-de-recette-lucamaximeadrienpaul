import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { errorMiddleware, logError } from "./middlewares/errorMiddleware.ts";
import { db } from "./db.ts";
import { recipeRouter } from "./routes/recipe.route.ts";
import { categoryRouter } from "./routes/category.route.ts";
import { ingredientRouter } from "./routes/ingredient.route.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";


try {
    if (import.meta.main) {

        const app = new Application();
        const router = new Router();
        await db.connect();

        app.use(oakCors());

        app.use(errorMiddleware);

        router.get("media", "/media/:filename", async (context) => {
            const filename = context.params.filename;
            const file = await Deno.open(`./media/${filename}`);
            context.response.body = file;
            context.response.type = "image/jpeg";
        });

        router.use("/ingredient", ingredientRouter.routes());
        router.use("/recipe", recipeRouter.routes());
        router.use("/category", categoryRouter.routes());

        app.use(router.routes());
        app.use(router.allowedMethods());

        console.log("Serveur démarré sur http://localhost:8000");
        await app.listen({ port: 8000 });
    }

} catch (error: any) {
    logError(`${error.stack}`, 'CRITICAL');
}
