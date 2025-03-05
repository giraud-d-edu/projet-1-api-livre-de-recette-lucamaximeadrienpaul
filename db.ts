import { MongoClient } from "https://deno.land/x/mongo@v0.34.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config(); // Charge les variables depuis .env

class Database {
  private client: MongoClient;
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
      console.log(`✅ Connexion réussie à MongoDB: ${dbName}`);
    } catch (error) {
      console.error("❌ Échec de la connexion à MongoDB :", error);
      throw new Error("Connexion à la base de données échouée");
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
