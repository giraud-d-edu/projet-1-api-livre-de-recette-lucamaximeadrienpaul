<script lang="ts">
    export let status: number;
    export let message: string;
</script>

<section class="flex items-center justify-center">
    <div class="text-center">
        <h1 class="mb-4 text-9xl font-extrabold">
            <span class="sr-only">Erreur</span> {status}
        </h1>
        <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</p>
        <button type="button" on:click={() => window.history.back()} class="bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4" role="link">Retour</button>
    </div>
</section>