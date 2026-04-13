<script lang="ts">
	import { skills } from '$lib/data/portfolio';
</script>

<section id="skills" class="mx-auto max-w-4xl px-4 py-20">
	<h2 class="mb-12 text-center text-4xl font-bold">Technical Arsenal</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each skills as skillGroup (skillGroup.category)}
			<div
				class="rounded-3xl border border-secondary bg-secondary/20 p-8 transition-colors duration-300 hover:border-text-main/20"
			>
				<h3 class="mb-6 border-b border-text-main/10 pb-4 font-serif text-xl italic">
					{skillGroup.category}
				</h3>
				<div class="flex flex-wrap gap-3">
					{#each skillGroup.items as item (item)}
						<span
							class="cursor-default rounded-full border border-secondary/50 bg-primary px-4 py-2 text-sm font-medium tracking-wide shadow-sm transition-colors duration-300 hover:border-accent hover:bg-accent"
						>
							{item}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
