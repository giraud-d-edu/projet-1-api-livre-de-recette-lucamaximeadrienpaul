<script lang="ts">
	import { recipeStore, loading, error } from '$lib/recipe/stores/recipe';
	import type { AddRecipe } from '$lib/recipe/types/add-recipe';
	import Modal from '$lib/Shared/components/UserModal.svelte';
	import RecipeForm from '$lib/recipe/components/RecipeForm.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import {btnStyle} from '$lib/Shared/variable';
	
	
	let showModal = import {btnStyle} from '$lib/Shared/variable';false;
	let messageErreur = '';
	
	async function submit(recipe: AddRecipe) {
		try {
			await recipeStore.create(recipe);
			if (!$error) {
				window.history.back();
			} else {
				messageErreur = $error;
				showModal = true;
			}
		} catch (err) {
			messageErreur = err instanceof Error ? err.message : 'An unknown error occurred';
			showModal = true;
		}
	}
</script>

{#if $loading}
	<LoadingCircle />
{:else}
    <button class={btnStyle} on:click={() => (window.location.href = `/recipe`)}>Revenir à la liste des recettes</button>
    <RecipeForm {submit}/>
{/if}

{#if showModal}
<Modal isOpen={showModal} onClose={() => showModal = false}>
	<p>{messageErreur}</p>
</Modal>
{/if}
