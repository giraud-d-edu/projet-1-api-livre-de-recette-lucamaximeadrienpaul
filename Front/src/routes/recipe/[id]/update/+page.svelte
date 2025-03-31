<script lang="ts">
	import { recipeStore, loading, recipes, error } from '$lib/recipe/stores/recipe';
    import type { Recipe } from '$lib/recipe/types/recipe';
    import RecipeForm from "$lib/recipe/components/RecipeForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
    import { onMount } from "svelte";
    import { page } from "$app/state";
	import type { UpdateRecipe } from '$lib/recipe/types/update-recipe';
    import {btnStyle} from '$lib/Shared/variable';

    async function submit(recipe: UpdateRecipe) {
        try {
            await recipeStore.update(recipe);
            if (!$error) {
                window.history.back();
            } else {
                alert($error);
            }
        } catch (err) {
            console.error('Erreur survenue lors de la modification de la recette :', err);
        }
	}

	function recipeToUpdateRecipe(recipe: Recipe): UpdateRecipe {
		return {
			id: recipe.id,
			name: recipe.name,
			ingredientsId: recipe.ingredients.map(ingredient => ingredient.id),
			description: recipe.description,
			step: recipe.step,
			categoriesId: recipe.categories.map(categorie => categorie.id),
			time: recipe.time,
			origin: recipe.origin,
		    image: recipe.image
        };
	}

    onMount(() => {
        recipeStore.loadOne(page.params.id);
    });
</script>

{#if $loading || $recipes.length === 0}
	<LoadingCircle />
{:else}
    <button class={btnStyle} on:click={() => (window.location.href = `/recipe`)}>Revenir à la liste des recettes</button>
    <RecipeForm {submit} recipe={recipeToUpdateRecipe($recipes[0])}/>
{/if}