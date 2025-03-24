import { Context, isHttpError } from "https://deno.land/x/oak/mod.ts";

const baseLogFilePath = "./log";

/**
 * Fonction pour enregistrer les erreurs dans un fichier de log
 */
export async function logError(message: string, type: 'CRITICAL' | 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG') {

    const logFilePath = `${baseLogFilePath}/error-${new Date().toISOString().split("T")[0]}.log`;

    const logMessage = `[${new Date().toISOString()}] ${type}: ${message}\n`;
    console.error(logMessage);

    //create directory if it doesn't exist
    try {
        await Deno.mkdir(baseLogFilePath, { recursive: true });
    }
    catch (createDirError) {
        console.log(`Impossible de créer le répertoire de log: ${createDirError}`);
        return;
    }

    try {
        await Deno.writeTextFile(logFilePath, logMessage, { append: true, create: true });
    } catch (writeError) {
        console.log(`Impossible d'écrire dans le fichier de log: ${writeError}`);
        return;
    }
}

/**
 * Middleware pour gérer les exceptions
 */
export async function errorMiddleware(
    ctx: Context<Record<string, any>>,
    next: () => Promise<unknown>
) {
    try {
        await next();
    } catch (err: any) {
        if (isHttpError(err)) {
            const status = err.status;
            const errorMessage = err.message;

            logError(`URL: ${ctx.request.url} - Status: ${status} - Message: ${errorMessage}`, 'WARNING');

            ctx.response.status = status;
            ctx.response.body = {
                success: false,
                message: errorMessage,
                status,
            };
        } else {
            logError(`URL: ${ctx.request.url} - Status: 500 - ${err.stack}`, 'ERROR');

            ctx.response.status = 500;
            ctx.response.body = {
                success: false,
                message: 'Une erreur est survenue sur le serveur',
                status: 500,
            };
        }
    }
}