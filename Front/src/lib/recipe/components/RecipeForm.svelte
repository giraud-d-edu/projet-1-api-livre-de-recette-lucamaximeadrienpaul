<script lang="ts">
	import { onMount } from 'svelte';
	import { ingredients, ingredientStore } from '$lib/ingredient/stores/ingredient';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { UpdateRecipe } from '$lib/recipe/types/update-recipe';
	import type { AddRecipe } from '../types/add-recipe';
	import {inputStyle, btnStyle, selectStyle} from '$lib/Shared/variable';
	
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
		<input class={inputStyle} maxlength="20" type="text" bind:value={recipe.name} />
	</label>
	<label>
		Temps de préparation
		<input class={inputStyle} type="number" bind:value={recipe.time} />
	</label>
	<label for="ingredients">Ingredients:</label>
	<select class={selectStyle} id="ingredients" bind:value={recipe.ingredientsId} multiple>
		{#each $ingredients as ingredient}
			<option value={ingredient.id}>{ingredient.name}</option>
		{/each}
	</select>

	<label for="categories">Categories:</label>
	<select class={selectStyle} id="categories" bind:value={recipe.categoriesId} multiple>
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>

	<label for="description">Description:</label>
	<textarea class={inputStyle} id="description" bind:value={recipe.description}></textarea>

	<label for="step">Step:</label>
	<textarea class={inputStyle} id="step" bind:value={recipe.step}></textarea>

	<label for="origin">Origin:</label>
	<input class={inputStyle} id="origin" bind:value={recipe.origin} />

	<label for="image">Image:</label>
	<input class="{btnStyle} mt-3 mb-3" type="file" accept="image/*" on:change={handleFile} />

	{#if recipe.image}
		<img class="mb-3" src={URL.createObjectURL(recipe.image)} alt="" width="200" />
	{/if}

	<button class="{btnStyle}" type="submit">Enregistrer</button>
</form>
