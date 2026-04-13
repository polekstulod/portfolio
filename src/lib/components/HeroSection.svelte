<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { personalInfo } from '$lib/data/portfolio';

	let titleRef: HTMLHeadingElement;

	onMount(() => {
		// "Toy Hammer" style click interaction on the entire document body
		const clickEffect = (e: MouseEvent) => {
			const spark = document.createElement('div');
			spark.className =
				'absolute w-6 h-6 rounded-full bg-accent pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-screen';
			spark.style.left = `${e.pageX}px`;
			spark.style.top = `${e.pageY}px`;
			document.body.appendChild(spark);

			gsap.to(spark, {
				scale: 3,
				opacity: 0,
				duration: 0.6,
				ease: 'power3.out',
				onComplete: () => spark.remove()
			});
		};

		document.addEventListener('click', clickEffect);

		// Entrance animation
		gsap.from(titleRef, {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: 'power4.out',
			delay: 0.2
		});

		return () => {
			document.removeEventListener('click', clickEffect);
		};
	});
</script>

<section id="about" class="flex flex-col items-center px-4 py-24 text-center">
	<div class="max-w-2xl space-y-6">
		<h1 bind:this={titleRef} class="text-5xl font-bold md:text-7xl">
			Hi, I'm <span
				class="bg-gradient-to-r from-accent to-text-main bg-clip-text text-accent text-transparent"
				>{personalInfo.name}</span
			>
		</h1>
		<h2 class="font-serif text-2xl text-text-main/80 italic">
			{personalInfo.title}
		</h2>
		<p class="text-lg leading-relaxed text-text-main/70">
			{personalInfo.about}
		</p>
		<div class="flex justify-center gap-4 pt-6">
			<a
				href={personalInfo.links.github}
				target="_blank"
				class="rounded-full border border-text-main px-6 py-3 transition-all hover:bg-text-main hover:text-primary"
				>GitHub</a
			>
			<a
				href={personalInfo.links.linkedin}
				target="_blank"
				class="rounded-full border border-text-main px-6 py-3 transition-all hover:bg-text-main hover:text-primary"
				>LinkedIn</a
			>
			<a
				href={personalInfo.links.resume}
				target="_blank"
				class="rounded-full border border-text-main px-6 py-3 transition-all hover:bg-text-main hover:text-primary"
				>Resume</a
			>
		</div>
	</div>
</section>
