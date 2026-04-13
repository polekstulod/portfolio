<script lang="ts">
	import { fade } from 'svelte/transition';
	import WorkExperience from './WorkExperience.svelte';
	import Projects from './Projects.svelte';

	let view = $state<'professional' | 'personal'>('professional');
</script>

<section id="experience" class="mx-auto max-w-4xl px-4 py-20">
	<div class="mb-16 flex flex-col items-center">
		<h2 class="mb-8 text-center text-4xl font-bold">Journey & Work</h2>

		<!-- Toggle Switch -->
		<div class="inline-flex rounded-full border border-secondary bg-secondary/50 p-1">
			<button
				onclick={() => (view = 'professional')}
				class="rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-300 {view ===
				'professional'
					? 'bg-primary shadow-sm'
					: 'hover:bg-primary/50'}"
			>
				Professional Experience
			</button>
			<button
				onclick={() => (view = 'personal')}
				class="rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-all duration-300 {view ===
				'personal'
					? 'bg-primary shadow-sm'
					: 'hover:bg-primary/50'}"
			>
				Personal Projects
			</button>
		</div>
	</div>

	<!-- Content Area with Svelte transitions -->
	<div class="grid">
		{#if view === 'professional'}
			<div
				in:fade={{ duration: 400, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="col-start-1 row-start-1"
			>
				<WorkExperience />
			</div>
		{:else}
			<div
				in:fade={{ duration: 400, delay: 200 }}
				out:fade={{ duration: 200 }}
				class="col-start-1 row-start-1"
			>
				<Projects />
			</div>
		{/if}
	</div>
</section>
