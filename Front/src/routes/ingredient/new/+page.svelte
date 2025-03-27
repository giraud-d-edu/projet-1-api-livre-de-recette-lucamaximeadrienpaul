<script lang="ts">
	import { ingredientStore, loading, error } from '../../../lib/ingredient/stores/ingredient';
	import Modal from '$lib/Shared/components/UserModal.svelte';

    import IngredientForm from "$lib/ingredient/components/IngredientForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import {btnStyle} from '$lib/Shared/variable';
	import type { AddIngredient } from '$lib/ingredient/types/add-ingredient';

    let showModal = false;
	let messageErreur = '';
    async function submit(ingredient: AddIngredient) {
        try {
            await ingredientStore.create(ingredient);
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
    <button class={btnStyle} on:click={() => (window.location.href = `/ingredient`)}>Revenir à la liste des ingrédients</button>
    <IngredientForm {submit}/>
{/if}

{#if showModal}
<Modal isOpen={showModal} onClose={() => showModal = false}>
	<p>{messageErreur}</p>
</Modal>
{/if}