<script lang="ts">
	import { ingredientStore, loading, error } from '$lib/ingredient/stores/ingredient';
    import IngredientForm from "$lib/ingredient/components/IngredientForm.svelte";
	import LoadingCircle from '$lib/Shared/components/LoadingCircle.svelte';
	import type { AddIngredient } from '$lib/ingredient/types/add-ingredient';

    async function submit(ingredient: AddIngredient) {
        try {
            await ingredientStore.create(ingredient);
            if (!$error) {
                window.history.back();
            } else {
                alert($error);
            }
        } catch (err) {
            console.error('Erreur survenue lors de la création de l\'ingrédient :', err);
        }
	}
</script>

{#if $loading}
	<LoadingCircle />
{:else}
    <button on:click={() => (window.location.href = `/ingredient`)}>Revenir à la liste des ingrédients</button>
    <IngredientForm {submit}/>
{/if}