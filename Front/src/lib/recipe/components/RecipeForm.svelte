<script lang="ts">
	import { onMount } from 'svelte';
	import { ingredients, ingredientStore } from '$lib/ingredient/stores/ingredient';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { UpdateRecipe } from '$lib/recipe/types/update-recipe';
	import type { AddRecipe } from '../types/add-recipe';
	import { inputStyle, btnStyle, selectStyle } from '$lib/Shared/variable';
	import { API_URL } from '$lib/Shared/services/const';

	export let recipe: UpdateRecipe | AddRecipe = {
		name: '',
		ingredientsId: [],
		description: '',
		step: '',
		categoriesId: [],
		time: 10,
		origin: '',
		image: null
	};

	export let submit: (recipe: UpdateRecipe | AddRecipe) => void;

	onMount(() => {
		ingredientStore.load();
		categoryStore.load();
	});

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
		<input class={inputStyle} maxlength="255" type="text" bind:value={recipe.name} required/>
	</label>
	<label>
		Temps de préparation
		<input class={inputStyle} type="number" min="0" bind:value={recipe.time} required/>
	</label>
	<label for="ingredients">Ingredients:</label>
	<select class={selectStyle} id="ingredients" bind:value={recipe.ingredientsId} multiple required>
		{#each $ingredients as ingredient}
			<option value={ingredient.id}>{ingredient.name}</option>
		{/each}
	</select>

	<label for="categories">Categories:</label>
	<select class={selectStyle} id="categories" bind:value={recipe.categoriesId} multiple required>
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>

	<label for="description">Description:</label>
	<textarea class={inputStyle} id="description" bind:value={recipe.description} required></textarea>

	<label for="step">Step:</label>
	<textarea class={inputStyle} id="step" bind:value={recipe.step} required></textarea>

	<label for="origin">Origin:</label>
	<input class={inputStyle} id="origin" bind:value={recipe.origin} />

	<label for="image">Image:</label>
	<input class="{btnStyle} mb-3 mt-3" type="file" accept="image/*" on:change={handleFile} />

	{#if recipe.image}
		<img
			class="mb-3"
			src={typeof recipe.image == 'string' ? API_URL + "/" + recipe.image : URL.createObjectURL(recipe.image)}
			alt=""
			width="200"
		/>
	{/if}

	<button class={btnStyle} type="submit">Enregistrer</button>
</form>
