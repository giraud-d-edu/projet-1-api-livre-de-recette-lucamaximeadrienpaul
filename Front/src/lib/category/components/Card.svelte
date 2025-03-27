<script lang="ts">
	import type { Category } from '$lib/category/types/category';

	export let category: Category;
</script>

<div class="card">
	<div class="content">
		<h2>{category.name}</h2>
		<span>Catégorie : {category.Type}</span>
	</div>
</div>

<style>
	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 1em;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.content {
		padding: 1em;
	}

	h2 {
		margin-top: 0;
	}

	.actions {
		margin-top: 1em;
	}
</style>
