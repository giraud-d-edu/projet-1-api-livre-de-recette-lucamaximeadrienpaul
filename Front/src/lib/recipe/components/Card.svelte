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
		<h2>{recipe.name}</h2>
		<span>Temps de preparation : {recipe.time} min</span>
		<p>{recipe.description}</p>
		<div class="actions">
			<button on:click={() => (window.location.href = `/recipe/${recipe.id}`)}>Voir détails</button>
			<button on:click={() => (window.location.href = `/recipe/update/${recipe.id}`)}
			>Modifier</button>
			<button on:click={() => deleteRecipe()}>Supprimer</button>
		</div>
	</div>
</div>

<style>

	.content {
		padding: 1em;
	}

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
