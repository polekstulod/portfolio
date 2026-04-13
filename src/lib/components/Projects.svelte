<script lang="ts">
	import { projects } from '$lib/data/portfolio';
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	{#each projects as project (project.title)}
		<div
			class="flex h-full flex-col rounded-2xl border border-secondary bg-secondary/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<h3 class="mb-1 text-xl font-bold">{project.title}</h3>
			<h4 class="text-md mb-4 font-serif text-text-main/70 italic">{project.role}</h4>

			<p class="mb-6 flex-grow leading-relaxed text-text-main/80">
				{project.description}
			</p>

			<div class="mt-auto flex flex-wrap gap-2">
				{#each project.techStack as tech (tech)}
					<span
						class="rounded-full border border-secondary bg-primary px-3 py-1 text-xs font-semibold tracking-wider uppercase"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>
	{/each}
</div>
