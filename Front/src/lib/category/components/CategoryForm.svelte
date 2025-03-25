<script lang="ts">
	import type { Category } from '$lib/category/types/category.ts';
	import { categoryService } from "$lib/category/services/category";

	export let category: Category = {
		id: '',
		name: '',
		Type: ''
	};

	async function submit(category: Category) {
		try {
			const newCategory = await categoryService.createCategory(category);
			console.log('Catégorie créée avec succès !', newCategory);
		} catch (error) {
			console.error('Erreur survenue lors de la création de la catégorie :', error);
		}
	}

	function handleSubmit() {
		submit(category);
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="name">Name:</label>
	<input id="name" bind:value={category.name} />

	<label for="type">Type:</label>
	<input id="type" bind:value={category.Type} />

	<button type="submit">Submit</button>
</form>