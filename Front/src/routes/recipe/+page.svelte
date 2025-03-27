<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/recipe/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { recipeStore, recipes, loading } from '$lib/recipe/stores/recipe';

	onMount(() => {
		recipeStore.load();
	});
</script>

<h1>Nos recettes</h1>
<button on:click={() => window.location.href = '/recipe/new'}>Ajouter une recette</button>
{#if $loading}
	<LoadingCircle />
{:else}
	<div class="grid">
		{#each $recipes as recipe}
			<Card {recipe} />
		{/each}
	</div>
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1em;
	}
</style>
