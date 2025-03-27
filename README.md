# 🥘 Mamithon

## 🚀 Lancement du Frontend

### 🛠 Installation
1. Installer [Node.js](https://nodejs.org/fr/download/).
2. Cloner le dépôt.

### ▶️ Exécution
Depuis la racine du projet, ce placer dans le dossier Front
```sh
cd .\Front\
```
Assurez-vous d'avoir installé toutes les dépendances avec :
```sh
npm install
```

Démarrez le serveur de développement avec :
```sh
npm run dev
```

### 🌍 Accès à l'application
Ouvrez votre navigateur et accédez à l'URL affichée dans la console après l'exécution de la commande précédente.

🛑 **Arrêter le serveur** : utilisez `Ctrl + C` dans le terminal.

---

## 🔧 Lancement du Backend

### 🛠 Installation
1. Installer [Deno](https://docs.deno.com/runtime/getting_started/installation/).
2. Cloner le dépôt.

### ⚙️ Configuration
#### Dans **VSCode** :
1. Ouvrez la palette de commandes (`Ctrl + Maj + P`).
2. Sélectionnez **"Deno : Initialize workspace configuration"**.

#### 📄 Fichier `.env`
Depuis la racine du projet, ce placer dans le dossier Back
```sh
cd .\Back\
```
Créez un fichier `.env` et renseignez les informations suivantes :
```env
MONGO_URI=your_mongo_connection_string
MONGO_DB_NAME=your_database_name
```
Un exemple est disponible dans `exemple.env`.

### ▶️ Démarrage du serveur
Dans le terminal, exécutez :
```sh
deno task dev
```

---

## 📡 API Endpoints

### 🍽 Recipe
| Action         | Méthode | URL                              |
|---------------|---------|----------------------------------|
| GetAllRecipe  | GET     | `http://localhost:8000/recipe/` |
| GetRecipeById | GET     | `http://localhost:8000/recipe/:id` |
| CreateRecipe  | POST    | `http://localhost:8000/recipe/` |
| UpdateRecipe  | PUT     | `http://localhost:8000/recipe/:id` |
| DeleteRecipe  | DELETE  | `http://localhost:8000/recipe/:id` |

### 🥕 Ingredient
| Action            | Méthode | URL                                  |
|------------------|---------|--------------------------------------|
| GetAllIngredient | GET     | `http://localhost:8000/ingredient/` |
| GetIngredientById | GET     | `http://localhost:8000/ingredient/:id` |
| CreateIngredient | POST    | `http://localhost:8000/ingredient/` |
| UpdateIngredient | PUT     | `http://localhost:8000/ingredient/:id` |
| DeleteIngredient | DELETE  | `http://localhost:8000/ingredient/:id` |

### 🏷 Category
| Action          | Méthode | URL                                |
|---------------|---------|----------------------------------|
| GetAllCategory | GET     | `http://localhost:8000/category/` |
| GetCategoryById | GET     | `http://localhost:8000/category/:id` |
| CreateCategory  | POST    | `http://localhost:8000/category/` |
| UpdateCategory  | PUT     | `http://localhost:8000/category/:id` |
| DeleteCategory  | DELETE  | `http://localhost:8000/category/:id` |

---

## 📌 Arguments

### 🍽 Recipe (POST/PUT)
```json
{
  "name": "string",
  "ingredientsId": ["string"],
  "description": "string",
  "step": "string",
  "categoriesId": ["string"],
  "time": number,
  "origin": "string"
}
```
🔍 **Filtres disponibles** :
- `name` : Filtre par mot-clé dans le titre.
- `categoriesId` : Liste des IDs de catégories.
- `ingredientId` : Liste des IDs d'ingrédients.
- `time` : Recherche les recettes avec un temps inférieur ou égal.

### 🥕 Ingredient (POST/PUT)
```json
{
  "name": "string",
  "categoriesId": ["string"]
}
```

### 🏷 Category (POST/PUT)
```json
{
  "name": "string",
  "type": "string"
}
```

---

## 🧪 Tests
Pour exécuter les tests, lancez la commande suivante :
```sh
deno test
```

---

🎯 **Mamithon** est un projet de gestion de recettes, offrant une API backend et une interface frontend. 🚀
