<script lang="ts">
	import { onMount } from 'svelte';
	import { categories, categoryStore } from '$lib/category/stores/category';
	import type { UpdateIngredient } from '../types/update-ingredient';
	import type { AddIngredient } from '../types/add-ingredient';
	import {inputStyle, btnStyle, selectStyle} from '$lib/Shared/variable';

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
	<input class={inputStyle} id="name"  maxlength="255"  bind:value={ingredient.name} />

	<label for="categories">Categories:</label>
	<select class={selectStyle} id="categories" bind:value={ingredient.categoriesId} multiple>
		{#each $categories as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>

	<button class="{btnStyle} mt-3" type="submit">Enregistrer</button>
</form>