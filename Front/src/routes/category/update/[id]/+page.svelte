<script lang="ts">
	import { categoryStore, loading, error } from '$lib/category/stores/category.ts';
    import type { Category } from '$lib/category/models/category.ts';

    import CategoryForm from "$lib/category/components/CategoryForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

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
</script>

{#if $loading}
	<LoadingCircle />
{:else}
    <CategoryForm {submit}/>
{/if}