<script lang="ts">
	import { experience } from '$lib/data/portfolio';
</script>

<div class="space-y-12">
	{#each experience as job (job.company + job.role)}
		<div
			class="group relative border-l-2 border-text-main/20 pb-2 pl-6 transition-colors duration-300 hover:border-accent"
		>
			<!-- Timeline dot -->
			<div
				class="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-2 border-primary bg-secondary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
			></div>

			<div class="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
				<h3 class="text-xl font-bold">{job.role}</h3>
				<span class="font-sans text-sm tracking-wide text-text-main/60 uppercase">{job.date}</span>
			</div>

			<h4 class="mb-4 font-serif text-lg text-text-main/80 italic">{job.company}</h4>

			<ul class="list-inside list-disc space-y-3 leading-relaxed text-text-main/70">
				{#each job.description as desc (desc)}
					<li>{desc}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
