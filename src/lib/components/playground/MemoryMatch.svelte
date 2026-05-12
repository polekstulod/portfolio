<script lang="ts">
	type Card = {
		id: number;
		symbol: string;
		matched: boolean;
		flipped: boolean;
	};

	const SYMBOLS = ['◆', '◉', '⬢', '▲', '●', '■'];

	let deckSeq = 0;

	function buildDeck(): Card[] {
		deckSeq += 1;
		const pairs = [...SYMBOLS, ...SYMBOLS];
		for (let i = pairs.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[pairs[i], pairs[j]] = [pairs[j], pairs[i]];
		}
		return pairs.map((symbol, idx) => ({
			id: deckSeq * 100 + idx,
			symbol,
			matched: false,
			flipped: false
		}));
	}

	let cards: Card[] = $state(buildDeck());
	let flippedIndices: number[] = $state([]);
	let moves = $state(0);
	let locked = $state(false);

	const matchedPairs = $derived(cards.filter((c) => c.matched).length / 2);
	const won = $derived(matchedPairs === SYMBOLS.length);

	async function flip(i: number) {
		if (locked) return;
		if (cards[i].matched || cards[i].flipped) return;

		cards[i].flipped = true;
		flippedIndices = [...flippedIndices, i];

		if (flippedIndices.length === 2) {
			moves += 1;
			locked = true;
			const [a, b] = flippedIndices;
			if (cards[a].symbol === cards[b].symbol) {
				cards[a].matched = true;
				cards[b].matched = true;
				flippedIndices = [];
				locked = false;
			} else {
				await new Promise((r) => setTimeout(r, 800));
				cards[a].flipped = false;
				cards[b].flipped = false;
				flippedIndices = [];
				locked = false;
			}
		}
	}

	function reset() {
		cards = buildDeck();
		flippedIndices = [];
		moves = 0;
		locked = false;
	}
</script>

<div class="flex flex-col items-center gap-5">
	<div class="flex gap-8 text-sm text-text-main/70">
		<div>Moves: <span class="font-bold text-text-main">{moves}</span></div>
		<div>
			Matched: <span class="font-bold text-accent">{matchedPairs} / {SYMBOLS.length}</span>
		</div>
	</div>

	<div class="grid grid-cols-4 gap-2 sm:gap-3">
		{#each cards as card, i (card.id)}
			<button
				onclick={() => flip(i)}
				disabled={locked || card.matched || card.flipped}
				class="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold shadow-md transition-all duration-300 sm:h-20 sm:w-20 sm:text-3xl
					{card.matched
					? 'bg-accent/20 text-accent ring-2 ring-accent/40'
					: card.flipped
						? 'bg-primary text-text-main'
						: 'bg-text-main text-text-main hover:bg-text-main/80'}"
				aria-label={card.flipped || card.matched ? `Card showing ${card.symbol}` : 'Hidden card'}
			>
				{card.flipped || card.matched ? card.symbol : ''}
			</button>
		{/each}
	</div>

	<button
		onclick={reset}
		class="rounded-full border border-text-main/20 px-5 py-2 text-sm font-medium text-text-main transition-colors hover:bg-text-main/10"
	>
		{won ? `Solved in ${moves} moves — shuffle again` : 'Shuffle'}
	</button>
</div>
