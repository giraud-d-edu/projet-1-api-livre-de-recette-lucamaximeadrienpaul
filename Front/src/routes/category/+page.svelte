<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/category/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { categoryStore, categories, loading } from '$lib/category/stores/category';

	onMount(() => {
		categoryStore.load();
	});
</script>

<h1>Nos catégories</h1>
<button on:click={() => window.location.href = '/category/new'}>Ajouter une catégorie</button>
{#if $loading}
	<LoadingCircle />
{:else}
	<div class="grid">
		{#each $categories as category}
			<Card {category}>
			</Card>
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
