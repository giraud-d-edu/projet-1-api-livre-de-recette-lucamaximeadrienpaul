<script lang="ts">
	import { categoryStore, loading, error } from '$lib/category/stores/category.ts';
    import type { Category } from '$lib/category/models/category.ts';

    import CategoryForm from "$lib/category/components/CategoryForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

    async function submit(category: Category) {
            await categoryStore.create(category);
            if (!$error) {
                // window.history.back();
            }
            else {
                alert($error);
            }
	}
</script>

{#if $loading}
	<LoadingCircle />
{:else}
    <CategoryForm on:submit={submit}/>
{/if}