export class RecipeService {
    getAllRecipes() {
        return {
                id: 1,
                name: 'Pizza',
                ingredients: ['Pate', 'sauce tomate', 'fromage', 'jambon']
        }
    }

    getRecipeById(id: number) {
        return {
            id: 1,
            name: 'Pizza',
            ingredients: ['Pate', 'sauce tomate', 'fromage', 'jambon']
        }
    }

    createRecipe(recipe: any) {
        console.log(recipe);
    }

    updateRecipe(id: number, recipe: any) {
        console.log(id, recipe);
    }

    deleteRecipe(id: number) {
        console.log(id);
    }
}