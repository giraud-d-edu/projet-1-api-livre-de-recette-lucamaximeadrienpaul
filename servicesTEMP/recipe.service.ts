export class RecipeService {
    static getAllRecipes() {
        return {
                id: "lhuigare234",
                name: 'Pizza',
                ingredientsId: ['A1', 'B2', 'C3', 'D4'],
                description: 'Pizza au jambon',
                step: 'faire la pizza',
                categoriesId: ['cat1', 'cat2'],
                time: 30,
                origin: 'Italie'
        }
    }
    static getRecipeById(id: number) {
        return {
            id: "lhuigare234",
            name: 'Pizza',
            ingredientsId: ['A1', 'B2', 'C3', 'D4'],
            description: 'Pizza au jambon',
            step: 'faire la pizza',
            categoriesId: ['cat1', 'cat2'],
            time: 30,
            origin: 'Italie'
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