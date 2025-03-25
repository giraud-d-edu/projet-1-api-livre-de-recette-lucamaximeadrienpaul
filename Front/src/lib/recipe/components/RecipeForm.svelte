<script lang="ts">
	import type { Recipe } from '$lib/recipe/types/recipe';

	export let recipe: Recipe = {
		id: '',
		name: '',
		ingredientsId: [],
		description: '',
		step: '',
		categoriesId: [],
		time: 10,
		origin: ''
	};
    export let submit = (recipe: Recipe) => {};
</script>

<form>
	<label>
		Nom de la recette
		<input type="text" bind:value={recipe.name} />
	</label>
	<label>
		Temps de préparation
		<input type="number" bind:value={recipe.time} />
	</label>
	<label>
		Description
		<textarea bind:value={recipe.description}></textarea>
	</label>
	<label>
		Origine
		<input type="text" bind:value={recipe.origin} />
	</label>
	<label>
		Etapes
		<textarea bind:value={recipe.step}></textarea>
	</label>
	<button on:click={() => submit(recipe)}>Enregistrer</button>
</form>
