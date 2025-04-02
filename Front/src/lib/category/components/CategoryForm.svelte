<script lang="ts">
	import type { Category } from '$lib/category/types/category.ts';
	import { inputStyle, btnStyle } from '$lib/Shared/variable';

	export let category: Category = {
		id: '',
		name: '',
		Type: ''
	};

	export let submit: (category: Category) => void;
	export let modal: boolean = false;
	export let modalMessage: string = '';

	function handleSubmit(category: Category) {
		if (!category.Type) {
			modalMessage = 'Please select a type';
			modal = true;
			return;
		}
		submit(category);
	}
</script>

<form on:submit|preventDefault={() => handleSubmit(category)}>
	<label for="name">Name:</label>
	<input class={inputStyle} id="name" bind:value={category.name} maxlength="255" required />

	<span>
		<label for="type">Type:</label>
		<input type="radio" id="type" value="ingredient" bind:group={category.Type} />
		<label for="Ingredient">Ingredient</label>
		<input type="radio" id="type" value="recette" bind:group={category.Type} />
		<label for="Recette">Recette</label>
	</span>

	<button class="{btnStyle} mt-3" type="submit">Enregistrer</button>
</form>
