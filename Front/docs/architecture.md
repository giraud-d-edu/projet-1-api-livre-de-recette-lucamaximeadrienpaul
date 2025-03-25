# Architecture du projet Svelte – Gestion de Recettes

## 1. Conventions de nommage

- **kebab-case** pour les dossiers et fichiers (ex. `lib/recipe/`, `lib/categories/`, etc.).
- **PascalCase** pour les composants et types (ex. `RecipeCard.svelte`, `CategoryForm.svelte`).
- **camelCase** pour les fonctions, méthodes et propriétés.

---

## 2. Organisation Par Domaine

Chaque entité (Recette, Catégorie, Ingrédient) dispose de son propre module avec les sous-dossiers suivants :
- **Component/** : Composants dédiés à l'entité.
- **stores/** : Gestion de l'état via Svelte stores.
- **services/** : Appels API et logique métier.
- **utils/** : Fonctions utilitaires spécifiques à l'entité.
- **types/** : Définition des types TypeScript pour l'entité.

### **Recette**
- **Component/** :  
  - `lib/recipe/Component/RecipeCard.svelte` – Affichage d'une recette (image, titre, actions).
  - `lib/recipe/Component/RecipeForm.svelte` – Formulaire de création/modification d'une recette.
- **stores/** :  
  - `lib/recipe/stores/recipeStore.ts` – Gestion de l'état des recettes.
- **services/** :  
  - `lib/recipe/services/recipeService.ts` – Appels API pour les recettes.
- **utils/** :  
  - `lib/recipe/utils/recipeUtil.ts` – Fonctions spécifiques à la gestion des recettes (formatage, validation, etc.).
- **types/** :  
  - `lib/recipe/types/TRecipe.ts` – Modèle de données pour une recette.

### **Catégories**
- **Component/** :  
  - `lib/categories/Component/CategoryFilter.svelte` – Composant de filtrage par catégorie.
  - `lib/categories/Component/CategoryForm.svelte` – Formulaire de création/modification d'une catégorie.
- **stores/** :  
  - `lib/categories/stores/categoryStore.ts` – Gestion de l'état des catégories.
- **services/** :  
  - `lib/categories/services/categoryService.ts` – Appels API pour les catégories.
- **utils/** :  
  - `lib/categories/utils/categoryUtil.ts` – Fonctions spécifiques à la gestion des catégories.
- **types/** :  
  - `lib/categories/types/TCategory.ts` – Modèle de données pour une catégorie.

### **Ingrédients**
- **Component/** :  
  - `lib/ingredients/Component/IngredientForm.svelte` – Formulaire pour ajouter ou modifier un ingrédient.
- **stores/** :  
  - `lib/ingredients/stores/ingredientStore.ts` – Gestion de l'état des ingrédients.
- **services/** :  
  - `lib/ingredients/services/ingredientService.ts` – Appels API pour les ingrédients.
- **utils/** :  
  - `lib/ingredients/utils/ingredientUtil.ts` – Fonctions spécifiques à la gestion des ingrédients.
- **types/** :  
  - `lib/ingredients/types/TIngredient.ts` – Modèle de données pour un ingrédient.

---

## 3. Plan des Composants Réutilisables

Afin de garantir la cohérence et la réutilisabilité de l'interface utilisateur, voici un plan des composants réutilisables utilisés dans l'ensemble du projet :

| Composant              | Domaine         | Description                                                         |
|------------------------|-----------------|---------------------------------------------------------------------|
| `Button.svelte`        | Global          | Bouton générique pour actions primaires ou secondaires.             |
| `Modal.svelte`         | Global          | Fenêtre modale réutilisable pour les dialogues ou formulaires.        |
| `Input.svelte`         | Global          | Champ de saisie avec gestion de la validation et des erreurs.         |
| `FilterPanel.svelte`   | Global/Recette  | Panneau de filtres pour les listes (ex. recettes, catégories).         |
| `RecipeCard.svelte`    | Recette         | Affichage condensé d'une recette avec image, titre et actions.         |
| `RecipeForm.svelte`    | Recette         | Formulaire de création et de modification d'une recette.              |
| `CategoryFilter.svelte`| Catégories      | Composant de filtrage pour afficher les recettes par catégorie.        |
| `CategoryForm.svelte`  | Catégories      | Formulaire de création/modification d'une catégorie.                  |
| `IngredientForm.svelte`| Ingrédients     | Formulaire pour ajouter ou modifier un ingrédient.                    |

Ces composants, qu'ils soient globaux ou spécifiques à une entité, favorisent la cohérence de l'interface et permettent une maintenance facilitée.

---

## 4. Organisation Globale du Projet

src/
├── lib/
│   ├── recipe/
│   │   ├── Component/
│   │   ├── stores/
│   │   ├── services/
│   │   ├── types/
│   ├── categories/
│   │   ├── Component/
│   │   ├── stores/
│   │   ├── services/
│   │   ├── types/
│   ├── ingredients/
│   |   ├── Component/
│   |   ├── stores/
│   |   ├── services/
│   |   └── types/
|   └── Shared/
│       ├── Component/
│       ├── stores/
│       ├── services/
│       ├── utils/
│       └── types/
└── routes/
    ├── +layout.svelte
    ├── +page.svelte
    ├── recipes/
    │   ├── +page.svelte
    │   └── [id]/
    │       └── +page.svelte
    ├── categories/
    |   └── +page.svelte
    └── ingredients/
        └── +page.svelte
