<script lang="ts">
	import { projects } from '$lib/data/portfolio';
</script>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
	{#each projects as project (project.title)}
		<div
			class="group flex h-full flex-col rounded-3xl border border-secondary bg-secondary/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:bg-secondary/50 hover:shadow-2xl hover:shadow-accent/10"
		>
			<h3 class="mb-2 text-2xl font-bold transition-colors duration-300 group-hover:text-accent">
				{project.title}
			</h3>
			<h4
				class="text-md mb-6 font-serif text-text-main/70 italic transition-colors duration-300 group-hover:text-text-main/90"
			>
				{project.role}
			</h4>

			<p class="mb-8 flex-grow leading-relaxed text-text-main/80">
				{project.description}
			</p>

			<div class="mt-auto flex flex-wrap gap-2">
				{#each project.techStack as tech (tech)}
					<span
						class="rounded-full border border-secondary bg-primary px-3 py-1.5 text-xs font-semibold tracking-wider text-text-main/80 uppercase transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>
	{/each}
</div>
