<script lang="ts">
	import { ingredientStore, loading, error } from '$lib/ingredient/stores/ingredient.ts';
    import type { Ingredient } from '$lib/ingredient/models/ingredient.ts';

    import IngredientForm from "$lib/ingredient/components/IngredientForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';

    async function submit(ingredient: Ingredient) {
            await ingredientStore.create(ingredient);
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
    <IngredientForm on:submit={submit}/>
{/if}