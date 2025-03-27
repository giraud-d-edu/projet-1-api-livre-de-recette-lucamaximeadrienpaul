<script lang="ts">
	import type { Ingredient } from '$lib/ingredient/types/ingredient';
	import { categories } from '$lib/category/stores/category';
	import { derived } from 'svelte/store';

	export let ingredient: Ingredient;

	const categoryNames = derived(categories, $categories =>
			ingredient.categoriesId.map(id => $categories.find(category => category.id === id)?.name || 'Unknown')
	);
</script>

<div class="card">
	<div class="content">
		<h2>{ingredient.name}</h2>
		<p>Categories: {#each $categoryNames as name}{name}{/each}</p>
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
