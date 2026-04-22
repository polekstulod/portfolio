<script lang="ts">
	import { skills } from '$lib/data/portfolio';
	import { scrollReveal } from '$lib/actions/scrollReveal';
</script>

<section id="skills" use:scrollReveal class="mx-auto max-w-4xl px-4 py-24">
	<h2 class="mb-16 text-center text-4xl font-bold md:text-5xl">Technical Arsenal</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each skills as skillGroup (skillGroup.category)}
			<div
				class="group rounded-3xl border border-secondary bg-secondary/20 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-secondary/40 hover:shadow-xl hover:shadow-accent/5"
			>
				<h3
					class="mb-6 border-b border-text-main/10 pb-4 font-serif text-2xl italic transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent"
				>
					{skillGroup.category}
				</h3>
				<div class="flex flex-wrap gap-3">
					{#each skillGroup.items as item (item)}
						<span
							class="cursor-default rounded-full border border-secondary/50 bg-primary px-4 py-2 text-sm font-medium tracking-wide shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-primary hover:shadow-md"
						>
							{item}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
