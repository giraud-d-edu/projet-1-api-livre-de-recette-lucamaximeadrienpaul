<script lang="ts">
	import { onMount } from 'svelte';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { UpdateIngredient } from '../types/update-ingredient';
	import type { AddIngredient } from '../types/add-ingredient';

	export let ingredient: AddIngredient | UpdateIngredient = {
		id: '',
		name: '',
		categoriesId: [],
	};

	export let submit: (ingredient: AddIngredient | UpdateIngredient) => void;

	onMount(() => {
		categoryStore.load();
	});
</script>

<form on:submit|preventDefault={() => submit(ingredient)}>
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