<script lang="ts">
	import type { Ingredient } from '$lib/ingredient/types/ingredient';
	import { ingredientStore } from '../stores/ingredient';
	import { cardStyle } from '$lib/Shared/variable';
	import {btnStyle} from '$lib/Shared/variable';

	export let ingredient: Ingredient;

	function deleteIngredient() {
		ingredientStore.delete(ingredient.id);
		window.location.href = '/ingredient';
	}
</script>


<div class="{cardStyle} flex flex-col">
	<div  class="text-center md:text-left">
		<h2 class="text-lg md:text-xl font-bold truncate">{ingredient.name}</h2>
		<p>
			Categories: {ingredient.categories.map(categorie => categorie.name).join(', ')}
		</p>
		<div class="flex flex-col md:flex-row md:justify-between gap-3 mt-4">
            <button class="{btnStyle} md:flex-grow-0 truncate" on:click={() => (window.location.href = `/ingredient/update/${ingredient.id}`)}>
                Modifier
            </button>
            <button class="{btnStyle} bg-red-500 hover:bg-red-600 md:flex-grow-0 truncate" on:click={() => deleteIngredient()}>
                Supprimer
            </button>
        </div>
	</div>
</div>

<style>


	h2 {
		font-weight: bold;
		text-align: center;
		font-size: large;
	}

	p {
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.actions {
		margin-top: 1em;
	}
</style>
