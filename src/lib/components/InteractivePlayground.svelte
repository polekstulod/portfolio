<script lang="ts">
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import { fade } from 'svelte/transition';
	import ScatterBlocks from './playground/ScatterBlocks.svelte';
	import TicTacToe from './playground/TicTacToe.svelte';
	import ReactionTest from './playground/ReactionTest.svelte';
	import MemoryMatch from './playground/MemoryMatch.svelte';
	import GameOfLife from './playground/GameOfLife.svelte';

	type GameId = 'scatter' | 'ttt' | 'reaction' | 'memory' | 'life';
	type Game = { id: GameId; label: string; blurb: string };

	const games: Game[] = [
		{ id: 'scatter', label: 'Scatter', blurb: 'GSAP physics — scatter and recall the blocks.' },
		{ id: 'ttt', label: 'Tic-Tac-Toe', blurb: "Minimax AI. You can't win — only draw." },
		{
			id: 'reaction',
			label: 'Reaction',
			blurb: 'Click the panel when it turns green. Beat your best time.'
		},
		{ id: 'memory', label: 'Memory', blurb: 'Find all six pairs in the fewest moves.' },
		{
			id: 'life',
			label: "Conway's Life",
			blurb: 'Cellular automaton — draw a pattern, hit play, watch it evolve.'
		}
	];

	let activeId: GameId = $state('scatter');
	const active = $derived(games.find((g) => g.id === activeId)!);
</script>

<section
	id="playground"
	use:scrollReveal
	class="overflow-hidden border-y border-secondary/50 bg-secondary/10 px-4 py-24"
>
	<div class="mx-auto flex max-w-4xl flex-col items-center">
		<h2 class="mb-3 text-center text-4xl font-bold">Interactive Playground</h2>
		<p class="mb-8 max-w-xl text-center text-text-main/70">
			Five mini-games — algorithms, animations, and reactivity. Pick a toy.
		</p>

		<div class="mb-6 flex flex-wrap justify-center gap-2" role="tablist">
			{#each games as game (game.id)}
				<button
					onclick={() => (activeId = game.id)}
					aria-pressed={activeId === game.id}
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors {activeId === game.id
						? 'bg-text-main text-primary shadow-lg'
						: 'border border-text-main/20 text-text-main hover:bg-text-main/10'}"
				>
					{game.label}
				</button>
			{/each}
		</div>

		<p class="mb-10 text-center text-sm text-text-main/60">{active.blurb}</p>

		{#key activeId}
			<div in:fade={{ duration: 220 }} class="w-full">
				{#if activeId === 'scatter'}
					<ScatterBlocks />
				{:else if activeId === 'ttt'}
					<TicTacToe />
				{:else if activeId === 'reaction'}
					<ReactionTest />
				{:else if activeId === 'memory'}
					<MemoryMatch />
				{:else if activeId === 'life'}
					<GameOfLife />
				{/if}
			</div>
		{/key}
	</div>
</section>
