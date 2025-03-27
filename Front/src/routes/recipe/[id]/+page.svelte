<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/Shared/services/const';

	import { recipeStore, loading, recipes } from '$lib/recipe/stores/recipe';

	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

	// Récupérer le paramètre d'URL
	const id = page.params.id;

	onMount(() => {
		recipeStore.loadOne(id);
	});

    function deleteRecipe() {
        recipeStore.delete(id);
        window.location.href = '/recipe';
    }
</script>

{#if $loading || !($recipes[0])}
	<LoadingCircle />
{:else}
	<h1>{$recipes[0].name}</h1>
	{#if $recipes[0].image}
		<img src={ API_URL + "/" + $recipes[0].image} alt="" />
	{/if}
	<p>{$recipes[0].description}</p>
	<h2>{$recipes[0].time} min</h2>
	<hr />
	<h3>Ingredients</h3>
	<ul>
		{#each $recipes[0].ingredients as ingredient}
			<li>{ingredient.name}</li>
		{/each}
	</ul>
	<hr />
	<p>{$recipes[0].step}</p>
	<hr />
    <button on:click={() => deleteRecipe()}>Delete</button>
{/if}
