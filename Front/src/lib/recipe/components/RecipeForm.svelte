<script lang="ts">
	import { onMount } from 'svelte';
	import { ingredients, ingredientStore } from '$lib/ingredient/stores/ingredient';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { Recipe } from '$lib/recipe/types/recipe.ts';
	import { recipeService } from "$lib/recipe/services/recipe";

	export let recipe: Recipe = {
		id: '',
		name: '',
		ingredientsId: [],
		description: '',
		step: '',
		categoriesId: [],
		time: 10,
		origin: '',
		image: null,
	};

	async function submit(recipe: Recipe) {
		try {
			const newRecipe = await recipeService.createRecipe(recipe);
			console.log('Recette créée avec succès !', newRecipe);
		} catch (error) {
			console.error('Erreur survenue lors de la création de la recette :', error);
		}
	}

	onMount(() => {
		ingredientStore.load();
		categoryStore.load();
	});

	function handleSubmit() {
		submit(recipe);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="name">Name:</label>
	<input id="name" bind:value={recipe.name} />

	<label for="ingredients">Ingredients:</label>
	<select id="ingredients" bind:value={recipe.ingredientsId} multiple>
		{#each $ingredients as ingredient}
			<option value={ingredient.id}>{ingredient.name}</option>
		{/each}
	</select>

	<label for="categories">Categories:</label>
	<select id="categories" bind:value={recipe.categoriesId} multiple>
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>

	<label for="description">Description:</label>
	<textarea id="description" bind:value={recipe.description}></textarea>

	<label for="step">Step:</label>
	<textarea id="step" bind:value={recipe.step}></textarea>

	<label for="time">Time:</label>
	<input id="time" type="number" bind:value={recipe.time} />

	<label for="origin">Origin:</label>
	<input id="origin" bind:value={recipe.origin} />

	<button type="submit">Submit</button>
</form>