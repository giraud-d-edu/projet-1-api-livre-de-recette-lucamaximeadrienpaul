import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { errorMiddleware, logError } from "./middlewares/errorMiddleware.ts";
import { db } from "./db.ts";

try {
  if (import.meta.main) {

    const app = new Application();
    const router = new Router();
    await db.connect();

    app.use(errorMiddleware);
    app.use(router.routes());
    app.use(router.allowedMethods());

    console.log("Serveur démarré sur http://localhost:8000");
    await app.listen({ port: 8000 });
  }

} catch (error: any) {
  logError(`${error.stack}`, 'CRITICAL');
}
