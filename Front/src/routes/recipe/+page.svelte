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

<span class="flex justify-between items-center">
	<h1 style="margin-bottom: 10px;">Nos produits</h1>
	<button class={btnStyle} style="margin-bottom: 10px;" on:click={() => window.location.href = '/recipe/new'}>Ajouter une recette</button>
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
