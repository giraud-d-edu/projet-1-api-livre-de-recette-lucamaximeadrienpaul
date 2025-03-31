<script lang="ts">
	import type { Recipe } from '$lib/recipe/types/recipe';
	import { recipeStore } from "$lib/recipe/stores/recipe";

	import {cardStyle, btnStyle} from '$lib/Shared/variable';
	export let recipe: Recipe;

	function deleteRecipe() {
		recipeStore.delete(recipe.id);
		window.location.href = '/recipe';
	}
</script>
<div class={cardStyle}>
    <div class="content">
        <h2 class="text-lg md:text-xl font-bold truncate">{recipe.name}</h2>
        <span class="block text-sm md:text-base truncate">Temps de préparation : {recipe.time} min</span>
        <p class="mt-2 text-sm md:text-base truncate">{recipe.description}</p>
        <div class="flex flex-col md:flex-row md:justify-center gap-3 mt-4">
            <button class={`${btnStyle} w-full md:w-auto `} on:click={() => (window.location.href = `/recipe/${recipe.id}`)}>
                Voir détails
            </button>
            <button class={`${btnStyle} bg-red-600 hover:bg-red-700 w-full md:w-auto`} on:click={() => deleteRecipe()}>
                Supprimer
            </button>
        </div>
    </div>
</div>

<style>

	h2 {
		font-weight: bold;
		text-align: center;
		font-size: large;
	}

	p {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.actions {
		margin-top: 1em;
	}
</style>
