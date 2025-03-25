<script>
	import { page } from '$app/state';

	import '../app.css';
</script>

<section>
	<div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
		<div class="mx-auto max-w-screen-sm text-center">
			<h1 class="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
				{page.status}
			</h1>
			{#if page.error}
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{page.error.message}</p>
			{/if}
			<button
				type="button"
				on:click={() => window.history.back()}
				class="bg-primary-600 hover:bg-primary-800 focus:ring-primary-300 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-mediumfocus:outline-none focus:ring-4"
				role="link">Retour</button
			>
		</div>
	</div>
</section>
