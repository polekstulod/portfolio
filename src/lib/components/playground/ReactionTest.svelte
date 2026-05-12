<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Phase = 'idle' | 'waiting' | 'ready' | 'clicked' | 'too-soon';

	let phase = $state<Phase>('idle');
	let startTime = 0;
	let lastReaction: number | null = $state(null);
	let bestReaction: number | null = $state(null);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	function clearTimer() {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	}

	onMount(() => {
		const saved = localStorage.getItem('reactionBest');
		if (saved !== null) {
			const n = Number(saved);
			if (Number.isFinite(n)) bestReaction = n;
		}
	});

	onDestroy(clearTimer);

	function handleClick() {
		if (phase === 'idle' || phase === 'clicked' || phase === 'too-soon') {
			phase = 'waiting';
			lastReaction = null;
			clearTimer();
			const delay = 1500 + Math.random() * 3000;
			timeoutId = setTimeout(() => {
				phase = 'ready';
				startTime = performance.now();
				timeoutId = null;
			}, delay);
		} else if (phase === 'waiting') {
			clearTimer();
			phase = 'too-soon';
		} else if (phase === 'ready') {
			const time = Math.round(performance.now() - startTime);
			lastReaction = time;
			if (bestReaction === null || time < bestReaction) {
				bestReaction = time;
				localStorage.setItem('reactionBest', String(time));
			}
			phase = 'clicked';
		}
	}

	const bgClass = $derived(
		phase === 'waiting'
			? 'bg-accent'
			: phase === 'ready'
				? 'bg-emerald-500'
				: phase === 'too-soon'
					? 'bg-amber-500'
					: 'bg-text-main'
	);

	const message = $derived(
		phase === 'idle'
			? 'Click to start'
			: phase === 'waiting'
				? 'Wait for green…'
				: phase === 'ready'
					? 'CLICK!'
					: phase === 'too-soon'
						? 'Too soon! Click to retry.'
						: `${lastReaction} ms — click to go again`
	);
</script>

<div class="flex w-full flex-col items-center gap-6">
	<button
		onclick={handleClick}
		class="flex h-64 w-full max-w-2xl items-center justify-center rounded-3xl text-2xl font-bold text-primary shadow-lg transition-colors {bgClass}"
		aria-live="polite"
	>
		{message}
	</button>

	<div class="flex gap-8 text-sm text-text-main/70">
		<div>
			Last:
			<span class="font-bold text-text-main"
				>{lastReaction !== null ? `${lastReaction} ms` : '—'}</span
			>
		</div>
		<div>
			Best:
			<span class="font-bold text-accent">{bestReaction !== null ? `${bestReaction} ms` : '—'}</span
			>
		</div>
	</div>

	<p class="max-w-md text-center text-xs text-text-main/50">
		Wait for the panel to turn green, then click as fast as you can. Average human reaction time is
		~250 ms.
	</p>
</div>
