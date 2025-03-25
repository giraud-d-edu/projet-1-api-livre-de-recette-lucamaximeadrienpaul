<script lang="ts">
	import type { Recipe } from '$lib/recipe/types/recipe';

	export let recipe: Recipe;
</script>

<div class="card">
	<div class="content">
		<h2>{recipe.name}</h2>
		<span>{recipe.time} min</span>
		<p>{recipe.description}</p>
		<div class="actions">
			<slot name="actions">
				<!-- Contenu par défaut si aucune action n'est fournie -->
				<button>Voir plus</button>
			</slot>
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
