<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/recipe/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { recipeStore, recipes, loading } from '$lib/recipe/stores/recipe';
	import {inputStyle, btnStyle} from '$lib/Shared/variable';

	onMount(() => {
		recipeStore.load();
	});
</script>

<span class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <span class="flex items-center">
        <h1 class="shrink-0 px-4 text-2xl font-bold text-gray-900">Nos produits</h1>
    </span>
    <button class={`${btnStyle} w-full md:w-auto mb-3`} on:click={() => window.location.href = '/recipe/new'}>Ajouter une recette</button>
</span>

{#if $loading}
	<LoadingCircle />
{:else}
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
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
