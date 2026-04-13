<script lang="ts">
	import { experience } from '$lib/data/portfolio';
</script>

<div class="space-y-14">
	{#each experience as job (job.company + job.role)}
		<div
			class="group relative border-l-2 border-text-main/20 pb-4 pl-8 transition-colors duration-500 hover:border-accent"
		>
			<!-- Timeline dot -->
			<div
				class="absolute top-2 -left-[9px] h-4 w-4 rounded-full border-2 border-primary bg-secondary transition-all duration-500 group-hover:scale-125 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_12px_rgba(192,92,71,0.6)]"
			></div>

			<div class="mb-3 flex flex-col md:flex-row md:items-baseline md:justify-between">
				<h3 class="text-2xl font-bold transition-colors duration-300 group-hover:text-accent">
					{job.role}
				</h3>
				<span
					class="font-sans text-sm tracking-wide text-text-main/50 uppercase transition-colors duration-300 group-hover:text-text-main/80"
					>{job.date}</span
				>
			</div>

			<h4 class="mb-5 font-serif text-xl text-text-main/80 italic">{job.company}</h4>

			<ul class="list-inside list-disc space-y-3 leading-relaxed text-text-main/70">
				{#each job.description as desc (desc)}
					<li class="transition-colors duration-300 group-hover:text-text-main/90">{desc}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
