<script lang="ts">
	import { categoryStore, loading, error } from '$lib/category/stores/category.ts';
    import type { Category } from '$lib/category/models/category.ts';
	import Modal from '$lib/Shared/components/UserModal.svelte';
    import CategoryForm from "$lib/category/components/CategoryForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import {btnStyle} from '$lib/Shared/variable';
	

	let showModal = false;
	let messageErreur = '';
	

    async function submit(category: Category) {
        try {
            await categoryStore.create(category);
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
    <button class={btnStyle} on:click={() => (window.location.href = `/category`)}>Revenir à la liste des catégories</button>
    <CategoryForm {submit}/>
{/if}

{#if showModal}
<Modal isOpen={showModal} onClose={() => showModal = false}>
	<p>{messageErreur}</p>
</Modal>
{/if}