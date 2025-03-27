<script lang="ts">
	import { ingredientStore, loading, ingredients, error } from '$lib/ingredient/stores/ingredient';
    import type { Ingredient } from '$lib/ingredient/types/ingredient';
    import IngredientForm from "$lib/ingredient/components/IngredientForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
    import {onMount} from "svelte";
    import {page} from "$app/state";
	import type { UpdateIngredient } from '$lib/ingredient/types/update-ingredient';

    async function submit(ingredient: UpdateIngredient) {
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

    function ingredientToUpdateIngredient(ingredient: Ingredient): UpdateIngredient {
        return {
            id: ingredient.id,
            name: ingredient.name,
            categoriesId: ingredient.categories.map(categorie => categorie.id),
        };
    }

    onMount(() => {
        ingredientStore.loadOne(page.params.id);
    });
</script>

{#if $loading || $ingredients.length === 0}
    <button on:click={() => (window.location.href = `/ingredient`)}>Revenir à la liste des ingrédients</button>
	<LoadingCircle />
{:else}
    <button on:click={() => (window.location.href = `/ingredient`)}>Revenir à la liste des ingrédients</button>
    <IngredientForm {submit} ingredient={ingredientToUpdateIngredient($ingredients[0])}/>
{/if}