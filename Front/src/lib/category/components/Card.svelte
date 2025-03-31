<script lang="ts">
	import type { Category } from '$lib/category/types/category';
	import { categoryStore } from '$lib/category/stores/category';
	import { cardStyle, btnStyle } from '$lib/Shared/variable';

	export let category: Category;

	function deleteCategory() {
		categoryStore.delete(category.id);
		window.location.href = '/category';
	}
</script>
<div class={`${cardStyle} flex flex-col`}>
    <div class="text-center md:text-left">
        <h2 class="text-lg md:text-xl font-bold truncate">{category.name}</h2>
        <div class="flex flex-col md:flex-row md:justify-between gap-3 mt-4">
            <button class={`${btnStyle} md:flex-grow-0 truncate`} on:click={() => (window.location.href = `/category/update/${category.id}`)}>
                Modifier
            </button>
            <button class={`${btnStyle} bg-red-500 hover:bg-red-600 md:flex-grow-0 truncate`} on:click={() => deleteCategory()}>
                Supprimer
            </button>
        </div>
    </div>
</div>

<style>


	h2 {
		font-weight: bold;
		text-align: center;
		font-size: large;
	}

	p {
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
