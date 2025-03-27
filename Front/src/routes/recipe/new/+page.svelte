<script lang="ts">
	import { recipeStore, loading, error } from '$lib/recipe/stores/recipe';
	import type { AddRecipe } from '$lib/recipe/types/add-recipe';

	import RecipeForm from '$lib/recipe/components/RecipeForm.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

	async function submit(recipe: AddRecipe) {
		try {
			await recipeStore.create(recipe);
			if (!$error) {
				window.history.back();
			} else {
				alert($error);
			}
		} catch (err) {
			console.error('Erreur survenue lors de la création de la recette :', err);
		}
	}
</script>

{#if $loading}
	<LoadingCircle />
{:else}
	<RecipeForm {submit} />
{/if}
