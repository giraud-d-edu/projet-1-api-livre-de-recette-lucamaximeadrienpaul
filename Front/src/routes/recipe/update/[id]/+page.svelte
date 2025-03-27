<script lang="ts">
	import { recipeStore, loading, error } from '$lib/recipe/stores/recipe';
    import type { Recipe } from '$lib/recipe/types/recipe';

    import RecipeForm from "$lib/recipe/components/RecipeForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

    async function submit(recipe: Recipe) {
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
</script>

{#if $loading}
	<LoadingCircle />
{:else}
    <RecipeForm {submit}/>
{/if}