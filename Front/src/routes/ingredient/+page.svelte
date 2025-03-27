<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/ingredient/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { ingredientStore, ingredients, loading } from '$lib/ingredient/stores/ingredient';
	import { btnStyle } from '$lib/Shared/variable';

	onMount(() => {
		ingredientStore.load();
	});
</script>

<span class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <span class="flex items-center">
        <h1 class="shrink-0 px-4 text-2xl font-bold text-gray-900">Nos ingrédients</h1>
    </span>
    <button class="${btnStyle} w-full md:w-auto" on:click={() => (window.location.href = '/ingredient/new')}>Ajouter un ingrédient</button>
</span>
{#if $loading}
	<LoadingCircle />
{:else}
	<div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
		{#each $ingredients as ingredient}
			<Card {ingredient} />
		{/each}
	</div>
{/if}

