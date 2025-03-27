<script lang="ts">
	import { recipeStore, loading, recipes, error } from '$lib/recipe/stores/recipe';
    import type { Recipe } from '$lib/recipe/types/recipe';

    import RecipeForm from "$lib/recipe/components/RecipeForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
    import {onMount} from "svelte";
    import {page} from "$app/state";

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

    onMount(() => {
        recipeStore.loadOne(page.params.id);
    });
</script>

{#if $loading || $recipes.length === 0}
    <button on:click={() => (window.location.href = `/recipe`)}>Revenir à la liste des recettes</button>
	<LoadingCircle />
{:else}
    <button on:click={() => (window.location.href = `/recipe`)}>Revenir à la liste des recettes</button>
    <RecipeForm {submit} recipe={$recipes[0]}/>
{/if}