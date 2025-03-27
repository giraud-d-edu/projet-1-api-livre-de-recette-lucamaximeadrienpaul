<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/ingredient/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { ingredientStore, ingredients, loading } from '$lib/ingredient/stores/ingredient';

	onMount(() => {
		ingredientStore.load();
	});
</script>

<h1>Nos ingrédients</h1>
<button on:click={() => window.location.href = '/ingredient/new'}>Ajouter un ingrédient</button>
{#if $loading}
	<LoadingCircle />
{:else}
	<div class="grid">
		{#each $ingredients as ingredient}
			<Card {ingredient} />
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
