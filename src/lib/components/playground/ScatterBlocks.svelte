<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let blocks: HTMLDivElement[] = [];

	onMount(() => {
		scatterBlocks();
	});

	function scatterBlocks() {
		blocks.forEach((block) => {
			const randomX = (Math.random() - 0.5) * 400;
			const randomY = (Math.random() - 0.5) * 200;
			const randomRot = (Math.random() - 0.5) * 360;

			gsap.to(block, {
				x: randomX,
				y: randomY,
				rotation: randomRot,
				duration: 1.5,
				ease: 'power3.out'
			});
		});
	}

	function recallBlocks() {
		gsap.to(blocks, {
			x: 0,
			y: 0,
			rotation: 0,
			duration: 1,
			stagger: 0.1,
			ease: 'elastic.out(1, 0.5)'
		});
	}
</script>

<div class="flex flex-col items-center">
	<div class="relative z-10 mb-8 flex gap-3">
		<button
			onclick={scatterBlocks}
			class="rounded-full bg-text-main px-6 py-3 font-medium text-primary shadow-lg transition-colors hover:bg-text-main/80"
		>
			Scatter
		</button>
		<button
			onclick={recallBlocks}
			class="rounded-full border border-text-main/10 bg-accent px-6 py-3 font-medium text-text-main shadow-lg transition-all hover:brightness-110"
		>
			Recall
		</button>
	</div>

	<div
		class="relative flex h-64 w-full max-w-2xl items-center justify-center rounded-3xl border-2 border-dashed border-text-main/20"
	>
		<div class="relative h-12 w-12">
			{#each Array(5) as _, i (i)}
				<div
					bind:this={blocks[i]}
					class="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-text-main to-text-main/80 font-bold text-primary shadow-xl"
				>
					{i + 1}
				</div>
			{/each}
		</div>
	</div>
</div>
