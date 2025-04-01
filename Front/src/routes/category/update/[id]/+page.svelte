<script lang="ts">
	import { categoryStore, loading, categories, error } from '$lib/category/stores/category';
	import type { Category } from '$lib/category/types/category';
	import { page } from '$app/state';
	import { btnStyle } from '$lib/Shared/variable';
	import CategoryForm from '$lib/category/components/CategoryForm.svelte';
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { onMount } from 'svelte';
	import ErrorComponent from '$lib/Shared/components/error.svelte';
	import Modal from '$lib/Shared/components/UserModal.svelte';

	let showModal = false;
	let messageErreur = '';

	async function submit(category: Category) {
		try {
			await categoryStore.update(category);
			if (!$error) {
				window.history.back();
			} else {
				messageErreur = $error.message;
				showModal = true;
			}
		} catch (err) {
			console.error('Erreur survenue lors de la modification de la catégorie :', err);
		}
	}

	onMount(() => {
		categoryStore.loadOne(page.params.id);
	});
</script>

{#if $loading}
	<LoadingCircle />
{:else if $error && [404, 500].includes($error.status)}
	<ErrorComponent message={$error.message} status={$error.status} />
{:else if $categories.length > 0}
	<button class={btnStyle} on:click={() => (window.location.href = `/category`)}
		>Revenir à la liste des catégories</button
	>
	<CategoryForm {submit} category={$categories[0]} />
{/if}

{#if showModal}
	<Modal isOpen={showModal} onClose={() => (showModal = false)}>
		<p>{messageErreur}</p>
	</Modal>
{/if}
