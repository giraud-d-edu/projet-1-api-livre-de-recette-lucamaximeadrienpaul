<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/category/components/Card.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { categoryStore, separatedCategories, loading } from '$lib/category/stores/category';
	import {btnStyle} from '$lib/Shared/variable';

	onMount(() => {
		categoryStore.load();
	});
</script>

<span class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <span class="flex items-center">
        <h1 class="shrink-0 px-4 text-2xl font-bold text-gray-900">Nos catégories</h1>
    </span>
    <button class={`${btnStyle} w-full md:w-auto`} on:click={() => window.location.href = '/category/new'}>
        Ajouter une catégorie
    </button>
</span>
	{#if $loading || !($separatedCategories)}
		<LoadingCircle />
	{:else}
		{#each Object.keys($separatedCategories) as key}
			<span class="flex items-center">
				<span class="h-px flex-1 bg-gray-300"></span>
	
				<h2 class="shrink-0 px-4 text-2xl font-bold text-gray-900">{key}</h2>
	
				<span class="h-px flex-1 bg-gray-300"></span>
			</span>
			<div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
				{#each $separatedCategories[key] as category}
					<Card {category} />
				{/each}
			</div>
		{/each}
{/if}
