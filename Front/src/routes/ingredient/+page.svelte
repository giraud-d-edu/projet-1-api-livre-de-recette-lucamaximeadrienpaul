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

<span class="flex justify-between items-center">
	<h1>Nos ingrédients</h1>
	<button class={btnStyle} on:click={() => (window.location.href = '/ingredient/new')}>Ajouter un ingrédient</button>
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

