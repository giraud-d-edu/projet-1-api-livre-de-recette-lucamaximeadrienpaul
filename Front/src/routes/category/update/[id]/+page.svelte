<script lang="ts">
	import { categoryStore, loading, categories, error} from '$lib/category/stores/category';
    import type { Category } from '$lib/category/models/category';
    import { page } from '$app/state';
    import {btnStyle} from '$lib/Shared/variable';
    import CategoryForm from "$lib/category/components/CategoryForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import { onMount } from 'svelte';

    async function submit(category: Category) {
        try {
            await categoryStore.update(category);
            if (!$error) {
                window.history.back();
            } else {
                alert($error);
            }
        } catch (err) {
            console.error('Erreur survenue lors de la modification de la catégorie :', err);
        }
	}

    onMount(() => {
        categoryStore.loadOne(page.params.id);
    });
</script>

{#if $loading || $categories.length === 0}
	<LoadingCircle />
{:else}
    <button class={btnStyle} on:click={() => (window.location.href = `/category`)}>Revenir à la liste des catégories</button>
    <CategoryForm {submit} category={$categories[0]}/>
{/if}