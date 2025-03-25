<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/Shared/services/const';
	import { recipeStore, loading, recipes } from '$lib/recipe/stores/recipe';
	import Modal from '$lib/Shared/components/UserModal.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { ingredients } from '$lib/ingredient/stores/ingredient';

	// Récupérer le paramètre d'URL
	const id = page.params.id;
	let showModal = false;
	let messageErreur = '';



	onMount(() => {
		recipeStore.loadOne(id);
	});

	function deleteRecipe() {
		try {
			recipeStore.delete(id);
			window.location.href = '/recipe';
		} catch (err) {
			messageErreur = err instanceof Error ? err.message : 'An unknown error occurred';
			showModal = true;
		}
	}
</script>

<section class="content">
	{#if $loading || !($recipes[0])}
		<LoadingCircle />
	{:else}
		<span class="flex items-center">
			<span class="h-px flex-1 bg-gray-300"></span>

			<h1 class="shrink-0 px-4 text-2xl font-bold text-gray-900">{$recipes[0].name}</h1>

			<span class="h-px flex-1 bg-gray-300"></span>
		</span>
		<h2
			class=" w-40 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm"
		>
			Temps de préparation : {$recipes[0].time} min
		</h2>
		{#if $recipes[0].image}
		<span class="flex justify-center">
			<img class="w-200" src={API_URL + "/" + $recipes[0].image} alt="" />
		</span>
		{/if}
		<div class="description">
			<span class="mt-0.5 w-1/2 w-full rounded border border-indigo-600 p-5 shadow-md sm:text-sm">
				<h2 class="border-b-2 border-gray-300 text-lg font-bold text-gray-900">Description</h2>
				<p>{$recipes[0].description}</p>
			</span>
			<span class="mt-0.5 w-1/2 w-full rounded border border-indigo-600 p-5 shadow-md sm:text-sm">
				<h2 class="border-b-2 border-gray-300 text-lg font-bold text-gray-900">Etapes</h2>
				<p>{$recipes[0].step}</p>
			</span>
		</div>
		<ul>
			Ingrédients :
			{#each $recipes[0].ingredients as ingredient}
				<li class="list-disc ml-4">{ingredient.name}</li>
			{/each}
		</ul>
		<ul>
			Catégories :
			{#each $recipes[0].categories as category}
				<li class="list-disc ml-4">{category.name}</li>
			{/each}
		</ul>
		<button
			class="font-large w-30 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm text-xl text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
			on:click={() => deleteRecipe()}>Supprimer</button
		>
	{/if}
	{#if showModal}
		<Modal isOpen={showModal} onClose={() => (showModal = false)}>
			<p>{messageErreur}</p>
		</Modal>
	{/if}
</section>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1em;
	}
	p {
		word-wrap: break-word;
	}
	.description {
		display: flex;
		gap: 1em;
		flex-wrap: wrap;
	}
</style>
