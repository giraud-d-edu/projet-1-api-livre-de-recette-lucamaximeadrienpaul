<script lang="ts">
	import type { Ingredient } from '$lib/ingredient/types/ingredient';
	import { ingredientStore } from '../stores/ingredient';

	export let ingredient: Ingredient;

	function deleteIngredient() {
		ingredientStore.delete(ingredient.id);
		window.location.href = '/ingredient';
	}
</script>

<div class="card">
	<div class="content">
		<h2>{ingredient.name}</h2>
		<p>
			Categories: {#each ingredient.categories as categorie}{categorie.name}{/each}
		</p>
		<div class="actions">
			<button on:click={() => (window.location.href = `/ingredient/update/${ingredient.id}`)}
				>Modifier</button
			>
			<button on:click={() => deleteIngredient()}>Supprimer</button>
		</div>
	</div>
</div>

<style>
	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 1em;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.content {
		padding: 1em;
	}

	h2 {
		margin-top: 0;
	}

	.actions {
		margin-top: 1em;
	}
</style>
