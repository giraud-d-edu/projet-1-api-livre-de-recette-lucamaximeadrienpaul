<script lang="ts">
	import { ingredientStore, loading, ingredients, error } from '$lib/ingredient/stores/ingredient.ts';
    import type { Ingredient } from '$lib/ingredient/models/ingredient.ts';
    import IngredientForm from "$lib/ingredient/components/IngredientForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
    import {onMount} from "svelte";
    import {page} from "$app/state";

    async function submit(ingredient: Ingredient) {
        try {
            await ingredientStore.update(ingredient);
            if (!$error) {
                window.history.back();
            } else {
                alert($error);
            }
        } catch (err) {
            console.error('Erreur survenue lors de la modification de l\'ingrédient :', err);
        }
	}

    onMount(() => {
        ingredientStore.loadOne(page.params.id);
    });
</script>

{#if $loading || $ingredients.length === 0}
	<LoadingCircle />
{:else}
    <IngredientForm {submit} ingredient={$ingredients[0]}/>
{/if}