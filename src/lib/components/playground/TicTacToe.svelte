<script lang="ts">
	type Cell = 'X' | 'O' | null;

	const LINES = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	let board: Cell[] = $state(Array(9).fill(null));
	let aiThinking = $state(false);
	let wins = $state(0);
	let draws = $state(0);
	let losses = $state(0);

	function checkWinner(b: Cell[]): Cell | 'draw' | null {
		for (const [a, c, d] of LINES) {
			if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
		}
		if (b.every((c) => c !== null)) return 'draw';
		return null;
	}

	const winner = $derived(checkWinner(board));
	const winningLine = $derived.by(() => {
		for (const line of LINES) {
			const [a, c, d] = line;
			if (board[a] && board[a] === board[c] && board[a] === board[d]) return line;
		}
		return null;
	});

	const status = $derived(
		winner === 'X'
			? 'You win!'
			: winner === 'O'
				? 'AI wins.'
				: winner === 'draw'
					? "It's a draw."
					: aiThinking
						? 'AI thinking…'
						: 'Your move (X).'
	);

	// Minimax with depth weighting — AI is O (minimizer).
	// Faster wins score better; slower losses score "less bad".
	function minimax(b: Cell[], depth: number, isMax: boolean): number {
		const w = checkWinner(b);
		if (w === 'X') return 10 - depth;
		if (w === 'O') return depth - 10;
		if (w === 'draw') return 0;

		if (isMax) {
			let best = -Infinity;
			for (let i = 0; i < 9; i++) {
				if (b[i] === null) {
					b[i] = 'X';
					best = Math.max(best, minimax(b, depth + 1, false));
					b[i] = null;
				}
			}
			return best;
		} else {
			let best = Infinity;
			for (let i = 0; i < 9; i++) {
				if (b[i] === null) {
					b[i] = 'O';
					best = Math.min(best, minimax(b, depth + 1, true));
					b[i] = null;
				}
			}
			return best;
		}
	}

	function bestAIMove(b: Cell[]): number {
		let bestScore = Infinity;
		let bestMove = -1;
		for (let i = 0; i < 9; i++) {
			if (b[i] === null) {
				b[i] = 'O';
				const score = minimax(b, 0, true);
				b[i] = null;
				if (score < bestScore) {
					bestScore = score;
					bestMove = i;
				}
			}
		}
		return bestMove;
	}

	async function play(i: number) {
		if (board[i] !== null || winner !== null || aiThinking) return;
		board[i] = 'X';
		const afterPlayer = checkWinner(board);
		if (afterPlayer !== null) {
			tallyResult(afterPlayer);
			return;
		}

		aiThinking = true;
		await new Promise((r) => setTimeout(r, 280));

		const snapshot = [...board];
		const move = bestAIMove(snapshot);
		if (move !== -1) board[move] = 'O';
		aiThinking = false;

		const afterAI = checkWinner(board);
		if (afterAI !== null) tallyResult(afterAI);
	}

	function tallyResult(result: Cell | 'draw') {
		if (result === 'X') wins += 1;
		else if (result === 'O') losses += 1;
		else draws += 1;
	}

	function reset() {
		board = Array(9).fill(null);
		aiThinking = false;
	}
</script>

<div class="flex flex-col items-center gap-5">
	<p class="text-lg font-medium" aria-live="polite">{status}</p>

	<div class="grid grid-cols-3 gap-2">
		{#each board as cell, i (i)}
			<button
				onclick={() => play(i)}
				disabled={cell !== null || winner !== null || aiThinking}
				class="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-text-main/20 bg-primary/50 text-2xl font-bold transition-all enabled:hover:bg-primary disabled:cursor-not-allowed sm:h-20 sm:w-20 sm:text-3xl"
				class:text-accent={cell === 'X'}
				class:text-text-main={cell === 'O'}
				class:ring-2={winningLine?.includes(i)}
				class:ring-accent={winningLine?.includes(i)}
				aria-label={cell === null ? `Empty cell ${i + 1}` : `Cell ${i + 1}: ${cell}`}
			>
				{cell ?? ''}
			</button>
		{/each}
	</div>

	<div class="flex gap-6 text-xs text-text-main/60">
		<div>Wins <span class="font-bold text-text-main">{wins}</span></div>
		<div>Draws <span class="font-bold text-text-main">{draws}</span></div>
		<div>Losses <span class="font-bold text-text-main">{losses}</span></div>
	</div>

	<button
		onclick={reset}
		class="rounded-full border border-text-main/20 px-5 py-2 text-sm font-medium text-text-main transition-colors hover:bg-text-main/10"
	>
		{winner !== null ? 'Play again' : 'Reset board'}
	</button>
</div>
