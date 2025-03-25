<script lang="ts">
	import type { Ingredient } from '$lib/ingredient/types/ingredient';
	import { ingredientStore } from '../stores/ingredient';
	import { cardStyle } from '$lib/Shared/variable';

	export let ingredient: Ingredient;

	function deleteIngredient() {
		ingredientStore.delete(ingredient.id);
		window.location.href = '/ingredient';
	}
</script>

<div class={cardStyle}>
	<div class="content">
		<h2>{ingredient.name}</h2>
		<p>
			Categories: {ingredient.categories.map(categorie => categorie.name).join(', ')}
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
		overflow: hidden;
	}
	.actions {
		margin-top: 1em;
	}
</style>
