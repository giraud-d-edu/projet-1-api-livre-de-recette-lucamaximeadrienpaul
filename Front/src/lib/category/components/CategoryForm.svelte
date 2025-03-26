<script lang="ts">
	import type { Category } from '$lib/category/types/category.ts';
	import { categoryService } from "$lib/category/services/category";
	import type {Ingredient} from "$lib/ingredient/types/ingredient";

	export let category: Category = {
		id: '',
		name: '',
		Type: ''
	};

	export let submit: (category: Category) => void;
</script>

<form on:submit|preventDefault={() => submit(category)}>
	<label for="name">Name:</label>
	<input id="name" bind:value={category.name} />

	<label for="type">Type:</label>
	<input id="type" bind:value={category.Type} />

	<button type="submit">Submit</button>
</form>