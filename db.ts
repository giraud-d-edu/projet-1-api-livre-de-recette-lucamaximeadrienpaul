import { MongoClient } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

class Database {
  public readonly client: MongoClient;
  private db: any;

  constructor() {
    this.client = new MongoClient();
  }

  async connect() {
    try {
      const mongoUri = env.MONGO_URI;
      const dbName = env.MONGO_DB_NAME;

      await this.client.connect(mongoUri);
      this.db = this.client.database(dbName);
      await this.createCollections();
      console.log(`✅ Connexion réussie à MongoDB: ${dbName}`);
    } catch (error) {
      console.error("❌ Échec de la connexion à MongoDB :", error);
      throw new Error("Connexion à la base de données échouée");
    }
  }

  private async createCollections() {
    try {
      const collections = await this.db.listCollections().toArray();

      type Collection = { name: string };

      if (!collections.some((col: Collection) => col.name === "Recipes")) {
        await this.db.createCollection("Recipes");
        console.log("✅ Collection 'Recipes' créée.");
      }

      if (!collections.some((col: Collection) => col.name === "Ingredients")) {
        await this.db.createCollection("Ingredients");
        console.log("✅ Collection 'Ingredients' créée.");
      }

      if (!collections.some((col: Collection) => col.name === "Category")) {
        await this.db.createCollection("Category");
        console.log("✅ Collection 'Category' créée.");
      }
    } catch (error) {
      console.error("❌ Erreur lors de la création des collections:", error);
    }
  }


  getRecipesCollection() {
    return this.db.collection("Recipes");
  }

  getIngredientsCollection() {
    return this.db.collection("Ingredients");
  }

  getCategoryCollection() {
    return this.db.collection("Category");
  }
}

export const db = new Database();
