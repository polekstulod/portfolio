<script lang="ts">
	const ROWS = 15;
	const COLS = 25;
	const TICK_MS = 130;

	function emptyGrid(): boolean[][] {
		return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
	}

	function randomGrid(): boolean[][] {
		return Array.from({ length: ROWS }, () =>
			Array.from({ length: COLS }, () => Math.random() < 0.28)
		);
	}

	let grid: boolean[][] = $state(randomGrid());
	let running = $state(false);
	let generation = $state(0);

	const aliveCount = $derived(grid.flat().filter(Boolean).length);

	function neighbors(g: boolean[][], r: number, c: number): number {
		let count = 0;
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				const nr = (r + dr + ROWS) % ROWS;
				const nc = (c + dc + COLS) % COLS;
				if (g[nr][nc]) count++;
			}
		}
		return count;
	}

	function step() {
		const next = emptyGrid();
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				const n = neighbors(grid, r, c);
				const alive = grid[r][c];
				if (alive && (n === 2 || n === 3)) next[r][c] = true;
				else if (!alive && n === 3) next[r][c] = true;
			}
		}
		grid = next;
		generation += 1;
	}

	$effect(() => {
		if (!running) return;
		const id = setInterval(step, TICK_MS);
		return () => clearInterval(id);
	});

	function toggle(r: number, c: number) {
		if (running) return;
		grid[r][c] = !grid[r][c];
	}

	function randomize() {
		grid = randomGrid();
		generation = 0;
	}

	function clearGrid() {
		grid = emptyGrid();
		generation = 0;
		running = false;
	}
</script>

<div class="flex flex-col items-center gap-4">
	<div class="flex flex-wrap items-center justify-center gap-2">
		<button
			onclick={() => (running = !running)}
			class="rounded-full bg-text-main px-5 py-2 font-medium text-primary shadow-md transition-colors hover:bg-text-main/80"
		>
			{running ? 'Pause' : 'Play'}
		</button>
		<button
			onclick={step}
			disabled={running}
			class="rounded-full border border-text-main/20 px-4 py-2 text-sm font-medium text-text-main transition-colors enabled:hover:bg-text-main/10 disabled:opacity-40"
		>
			Step
		</button>
		<button
			onclick={randomize}
			class="rounded-full border border-text-main/20 px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-text-main/10"
		>
			Randomize
		</button>
		<button
			onclick={clearGrid}
			class="rounded-full border border-text-main/20 px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-text-main/10"
		>
			Clear
		</button>
	</div>

	<div class="flex gap-6 text-xs text-text-main/60">
		<div>Generation: <span class="font-bold text-text-main">{generation}</span></div>
		<div>Alive: <span class="font-bold text-accent">{aliveCount}</span></div>
	</div>

	<div
		class="grid w-full max-w-2xl gap-px rounded-2xl bg-text-main/10 p-2"
		style:grid-template-columns="repeat({COLS}, minmax(0, 1fr))"
		style:aspect-ratio="{COLS} / {ROWS}"
	>
		{#each grid as row, r (r)}
			{#each row as alive, c (c)}
				<button
					onclick={() => toggle(r, c)}
					disabled={running}
					aria-label="Cell {r},{c} {alive ? 'alive' : 'dead'}"
					class="aspect-square rounded-[2px] transition-colors {alive
						? 'bg-accent'
						: 'bg-primary/40 enabled:hover:bg-primary'}"
				></button>
			{/each}
		{/each}
	</div>

	<p class="max-w-md text-center text-xs text-text-main/50">
		Pause to draw — click cells to toggle. Edges wrap around (toroidal). Try a glider: three cells
		in an L-shape with two more diagonally.
	</p>
</div>
