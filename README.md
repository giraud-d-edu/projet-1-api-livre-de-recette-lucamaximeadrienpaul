# Mamithon

## Installation
* [Deno](https://docs.deno.com/runtime/getting_started/installation/) installé
* Cloner le repo
## Configuration
Sur VSCode  
    Ctrl + Maj + P : "Deno : initialze workspace configuration"
Creer le fichier .env  
    Renseigner le "MONGO_URI" et le "MONGO_DB_NAME"
## Demarage du serveur 
Dans le terminal : 
 ```bash
 deno task dev
 ```
## Requettes 
**Recipe :**  

| Action         | Methode | URL                                  |
|--------------|---------|--------------------------------------|
| GetAllRecipe | GET     | http://localhost:8000/recipe/       |
| GetRecipeById | GET     | http://localhost:8000/recipe/:id   |
| CreateRecipe  | POST    | http://localhost:8000/recipe/       |
| UpdateRecipe  | PUT     | http://localhost:8000/recipe/:id   |
| DeleteRecipe  | DELETE  | http://localhost:8000/recipe/:id   |

**Ingredient :**  

| Action            | Methode | URL                                    |
|------------------|---------|----------------------------------------|
| GetAllIngredient | GET     | http://localhost:8000/ingredient/     |
| GetIngredientById | GET     | http://localhost:8000/ingredient/:id |
| CreateIngredient  | POST    | http://localhost:8000/ingredient/     |
| UpdateIngredient  | PUT     | http://localhost:8000/ingredient/:id |
| DeleteIngredient  | DELETE  | http://localhost:8000/ingredient/:id |

**Category :**  

| Action          | Methode | URL                                  |
|---------------|---------|--------------------------------------|
| GetAllCategory | GET     | http://localhost:8000/category/     |
| GetCategoryById | GET     | http://localhost:8000/category/:id |
| CreateCategory  | POST    | http://localhost:8000/category/     |
| UpdateCategory  | PUT     | http://localhost:8000/category/:id |
| DeleteCategory  | DELETE  | http://localhost:8000/category/:id |
