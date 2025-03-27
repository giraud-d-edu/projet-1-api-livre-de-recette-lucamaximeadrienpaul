<script lang="ts">
	import { onMount } from 'svelte';
	import { ingredients, ingredientStore } from '$lib/ingredient/stores/ingredient';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { UpdateRecipe } from '$lib/recipe/types/update-recipe';
	import type { AddRecipe } from '../types/add-recipe';
	import type { Recipe } from '$lib/recipe/types/recipe';

	export let recipe: UpdateRecipe | AddRecipe = {
		name: '',
		ingredientsId: [],
		description: '',
		step: '',
		categoriesId: [],
		time: 10,
		origin: '',
		image: null,
	};

	export let submit: (recipe: UpdateRecipe | AddRecipe) => void;

	function handleFile(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			recipe.image = target.files[0];
		}
	}
</script>

<form on:submit|preventDefault={() => submit(recipe)}>
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
		Étapes
		<textarea bind:value={recipe.step}></textarea>
	</label>
	<label>
		Image
		<input type="file" accept="image/*" on:change={handleFile} />
	</label>

	{#if recipe.image}
		<img src={URL.createObjectURL(recipe.image)} alt="" width="200" />
	{/if}

	<button type="submit">Enregistrer</button>
</form>
