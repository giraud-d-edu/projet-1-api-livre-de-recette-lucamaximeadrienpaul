<script lang="ts">
	import { onMount } from 'svelte';
	import type { Ingredient } from '$lib/ingredient/types/ingredient.ts';
	import { ingredientService } from "$lib/ingredient/services/ingredient";
	import { categories, categoryStore } from '$lib/category/stores/category';

	export let ingredient: Ingredient = {
		id: '',
		name: '',
		categoriesId: [],
	};

	async function submit(ingredient: Ingredient) {
		try {
			const newIngredient = await ingredientService.createIngredient(ingredient);
			console.log('Ingrédient créé avec succès !', newIngredient);
		} catch (error) {
			console.error('Erreur survenue lors de la création de la recette :', error);
		}
	}

	onMount(() => {
		categoryStore.load();
	});

	function handleSubmit() {
		submit(ingredient);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="name">Name:</label>
	<input id="name" bind:value={ingredient.name} />

	<label for="categories">Categories:</label>
	<select id="categories" bind:value={ingredient.categoriesId} multiple>
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>

	<button type="submit">Submit</button>
</form>