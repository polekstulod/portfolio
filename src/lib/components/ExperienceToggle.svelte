<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import WorkExperience from './WorkExperience.svelte';
	import Projects from './Projects.svelte';

	let view = $state<'professional' | 'personal'>('professional');
</script>

<section id="experience" use:scrollReveal class="mx-auto max-w-4xl px-4 py-24">
	<div class="mb-20 flex flex-col items-center">
		<h2 class="mb-10 text-center text-4xl font-bold md:text-5xl">Journey & Work</h2>

		<!-- Toggle Switch -->
		<div
			class="inline-flex rounded-full border border-secondary bg-secondary/50 p-1.5 shadow-inner"
		>
			<button
				onclick={() => (view = 'professional')}
				class="rounded-full px-8 py-3.5 text-sm font-bold tracking-wide transition-all duration-500 active:scale-95 {view ===
				'professional'
					? 'scale-105 bg-accent text-primary shadow-lg'
					: 'text-text-main/70 hover:bg-primary/60 hover:text-text-main'}"
			>
				Professional Experience
			</button>
			<button
				onclick={() => (view = 'personal')}
				class="rounded-full px-8 py-3.5 text-sm font-bold tracking-wide transition-all duration-500 active:scale-95 {view ===
				'personal'
					? 'scale-105 bg-accent text-primary shadow-lg'
					: 'text-text-main/70 hover:bg-primary/60 hover:text-text-main'}"
			>
				Personal Projects
			</button>
		</div>
	</div>

	<!-- Content Area with Svelte transitions -->
	<div class="grid">
		{#if view === 'professional'}
			<div
				in:fly={{ y: 20, duration: 500, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="col-start-1 row-start-1"
			>
				<WorkExperience />
			</div>
		{:else}
			<div
				in:fly={{ y: 20, duration: 500, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="col-start-1 row-start-1"
			>
				<Projects />
			</div>
		{/if}
	</div>
</section>
