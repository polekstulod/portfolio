<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
</script>

<section id="contact" class="flex flex-col items-center px-4 py-32 text-center">
	<h2 class="mb-6 text-5xl font-bold">Let's Build Something</h2>
	<p class="mb-12 max-w-2xl text-xl leading-relaxed text-text-main/70">
		I'm always open to discussing new opportunities, creative projects, or sharing a virtual coffee.
	</p>

	<a
		href="mailto:{personalInfo.email}"
		class="mb-16 font-serif text-2xl text-accent italic underline decoration-accent/30 underline-offset-8 drop-shadow-md transition-opacity hover:opacity-80 md:text-4xl"
	>
		{personalInfo.email}
	</a>

	<div class="flex w-full max-w-xl justify-center gap-8 border-t border-secondary pt-12">
		<a
			href={personalInfo.links.github}
			target="_blank"
			class="text-sm font-bold tracking-widest text-text-main/60 uppercase transition-colors hover:text-text-main"
			>GitHub</a
		>
		<a
			href={personalInfo.links.linkedin}
			target="_blank"
			class="text-sm font-bold tracking-widest text-text-main/60 uppercase transition-colors hover:text-text-main"
			>LinkedIn</a
		>
		<a
			href={personalInfo.links.resume}
			target="_blank"
			class="text-sm font-bold tracking-widest text-text-main/60 uppercase transition-colors hover:text-text-main"
			>Resume</a
		>
	</div>
</section>
