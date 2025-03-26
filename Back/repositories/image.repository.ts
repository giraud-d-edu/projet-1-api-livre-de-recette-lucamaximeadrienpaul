import { ensureDir } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { ErrorObject } from "../models/error.model.ts";

const uploadDir = "./media";

await ensureDir(uploadDir);

export class ImageRepository {
  async uploadImage(file: any): Promise<string> {
    if (!file || !file.name) {
      throw new ErrorObject("Bad Request", "Aucun fichier n'a été envoyé");
    }
    console.log(file);
    const fileExtension = file.name.split('.').pop();
    if (!fileExtension) {
      throw new ErrorObject("Bad Request","Le fichier n'a pas d'extension");
    }

    const uniqueFileName = `${crypto.randomUUID()}.${fileExtension}`;

    const filePath = join(uploadDir, uniqueFileName);

    const fileStream = file.stream();
    const fileWriter = await Deno.open(filePath, { write: true, create: true });

    const reader = fileStream.getReader();
    const buffer = new Uint8Array(1024 * 8);

    while (true) {
      const { done, value } = await reader.read(buffer);
      if (done) break;
      await fileWriter.write(value);
    }

    fileWriter.close();

    return filePath;
  }
}
