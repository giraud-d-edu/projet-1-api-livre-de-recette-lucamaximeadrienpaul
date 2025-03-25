<script lang="ts">
	import type { Category } from '$lib/category/types/category';
	import { categoryStore } from '$lib/category/stores/category';
	import { cardStyle } from '$lib/Shared/variable';

	export let category: Category;

	function deleteCategory() {
		categoryStore.delete(category.id);
		window.location.href = '/category';
	}
</script>

<div class={cardStyle}>
	<div class="content">
		<h2>{category.name}</h2>
		<div class="actions">
			<button on:click={() => (window.location.href = `/category/update/${category.id}`)}
				>Modifier</button>
			<button on:click={() => deleteCategory()}>Supprimer</button>
		</div>
	</div>
</div>

<style>
.content {
		padding: 1em;
	}

	h2 {
		font-weight: bold;
		text-align: center;
		font-size: large;
	}

	p {
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.actions {
		margin-top: 1em;
	}
</style>
