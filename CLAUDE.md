# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical directives

1. **Package manager — bun only.** Never output `npm`, `yarn`, or `pnpm` commands. Translate any external snippets to their bun equivalents (`bun install`, `bun add`, `bun run`, `bunx`). The `package.json` `test` script invokes `npm run` — treat that as the one exception, and run it as `bun run test`.
2. **Svelte 5 runes only.** Use `$state`, `$derived`, `$effect`, `$props` exclusively. Do not introduce legacy Svelte 4 reactivity (`$:`, stores-as-reactivity, `export let`) or legacy lifecycle hooks. `svelte.config.js` forces rune mode on every file outside `node_modules`.
3. **Styling = Tailwind v4.** Avoid `<style>` blocks unless the effect (complex keyframe animations, pseudo-elements) genuinely cannot be done with utilities. Theme tokens (`bg-primary`, `text-accent`, `font-serif`, etc.) are defined in `src/routes/layout.css` via `@theme` — extend them there rather than hardcoding hex values in components.

## Svelte MCP workflow (mandatory for Svelte code)

The `svelte` MCP server is configured in `.mcp.json` and must be used whenever Svelte/SvelteKit code is written or queried:

1. **DISCOVER** — `mcp__svelte__list-sections` first to find relevant docs.
2. **READ** — `mcp__svelte__get-documentation` to fetch the sections identified above before writing code.
3. **VALIDATE** — Run drafted Svelte code through `mcp__svelte__svelte-autofixer` until no issues remain. Re-run after any correction.
4. **SHARE** — Only offer `mcp__svelte__playground-link` after delivering code, and never when the code was written directly to local files.

## Commands

| Task                        | Command                                |
| --------------------------- | -------------------------------------- |
| Dev server (localhost:5173) | `bun run dev`                          |
| Production build            | `bun run build`                        |
| Preview built site          | `bun run preview`                      |
| Type-check (svelte-check)   | `bun run check`                        |
| Type-check in watch mode    | `bun run check:watch`                  |
| Lint (prettier + eslint)    | `bun run lint`                         |
| Format (writes changes)     | `bun run format`                       |
| Unit tests (vitest, watch)  | `bun run test:unit`                    |
| Unit tests (single run)     | `bun run test`                         |
| Run one vitest file         | `bunx vitest run path/to/file.test.ts` |

## Architecture

SvelteKit single-page portfolio deployed to Vercel (`@sveltejs/adapter-vercel`). There is **one route** — `src/routes/+page.svelte` — which composes section components in order. There is no client-side routing; navigation is anchor-based smooth-scroll inside `Header.svelte`.

Key boundaries:

- **`src/routes/+page.svelte`** — assembles the page. Add new top-level sections here, in the visual order they should appear.
- **`src/routes/+layout.svelte` + `src/routes/layout.css`** — global wrapper and Tailwind v4 theme. The `@theme` block in `layout.css` is the single source of truth for colors (`--color-primary` peach, `--color-accent` terracotta `#c05c47`) and fonts (`Cormorant Garamond` serif, `Inter` sans). Google Fonts are imported in `src/app.html`.
- **`src/lib/components/*.svelte`** — one component per page section (Header, HeroSection, ExperienceToggle, WorkExperience, Projects, SkillsGrid, InteractivePlayground, ContactSection). `ExperienceToggle` owns the Work-vs-Projects view state and wraps `WorkExperience` and `Projects` with Svelte `fly`/`fade` transitions.
- **`src/lib/data/portfolio.ts`** — central data store for all copy (personal info, skills, experience entries, projects). Components import from here rather than hardcoding strings; update content here, not in markup.
- **`src/lib/actions/scrollReveal.ts`** — Svelte `use:` action that registers GSAP `ScrollTrigger` and fades/translates the node in on scroll. Reuse this rather than hand-rolling intersection observers; it guards against SSR with `typeof window !== 'undefined'`.
- **`src/lib/assets/`** — static assets imported through the `$lib` alias (e.g. `favicon.svg`).

Animation stack: GSAP (with `ScrollTrigger` from `gsap/dist/ScrollTrigger`) for scroll/physics effects, native Svelte `transition:` directives for view swaps.

### InteractivePlayground.svelte (and `playground/` subfolder)

The most algorithm-heavy section. `InteractivePlayground.svelte` is a thin **orchestrator** — it renders the section shell, the `scrollReveal` action, an `<h2>`, a tab bar, and a single active game. Each game lives in its own file under `src/lib/components/playground/`. Tab switches drive a `{#key activeId}` block, so the leaving game unmounts and the incoming one mounts fresh with a 220ms `in:fade` — games do not preserve state across tab switches by design (this keeps each visit clean and avoids stale timers).

The five games and what each demonstrates:

| Tab           | File                   | Showcases                                                                                                      |
| ------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| Scatter       | `ScatterBlocks.svelte` | GSAP transforms, ref arrays, easing curves (existing scatter/recall toy).                                      |
| Tic-Tac-Toe   | `TicTacToe.svelte`     | Depth-weighted minimax AI, `$derived` winner detection, win/draw/loss tally.                                   |
| Reaction      | `ReactionTest.svelte`  | State machine (`idle` → `waiting` → `ready` → `clicked`/`too-soon`), `performance.now()`, `localStorage` best. |
| Memory        | `MemoryMatch.svelte`   | Fisher–Yates shuffle, deep-proxy `$state` mutation, async flip-back, move counter.                             |
| Conway's Life | `GameOfLife.svelte`    | Toroidal cellular automaton, `$effect` interval lifecycle tied to `running` flag, play/step/clear.             |

Cross-cutting conventions that matter when editing any game:

- **Tab switches remount, not re-render.** Because the orchestrator uses `{#key activeId}` plus `{#if}`/`{:else if}` per game, each game runs its own `onMount`/`onDestroy`. Don't try to lift game state into the orchestrator — it would break this guarantee.
- **Don't rename a local variable to `state`.** Svelte 5's `$state` rune is interpreted by TypeScript as a `$store` auto-subscription when a same-named variable exists, producing confusing "Cannot use 'state' as a store" errors. `ReactionTest.svelte` uses `phase` instead — keep that pattern.
- **Type unions on `$state`** need the generic form: `let phase = $state<Phase>('idle')`. Writing `let phase: Phase = $state('idle')` narrows to the literal `'idle'` because TS infers from the argument. Same trap will bite any other union-valued state.
- **`$effect` for subscriptions, `onMount` for one-shot writes to state.** `GameOfLife.svelte` uses `$effect` to start/stop a `setInterval` tied to `running` (canonical use). `ReactionTest.svelte` uses `onMount` to read `localStorage` and seed `bestReaction` once — `svelte-autofixer` flags state writes inside `$effect` as malpractice, so use `onMount` for that pattern.
- **The section's `overflow-hidden` is still load-bearing** because `ScatterBlocks` tweens past the arena bounds (±200px x / ±100px y). Other games stay inside their containers, so don't remove it just because scatter isn't the only resident anymore.

ScatterBlocks-specific invariants (preserved from the original component):

- All five blocks share `class="absolute inset-0"` on a single `relative h-12 w-12` parent — resting position is one perfect stack at the arena center, and the visible deck is created entirely by GSAP transforms. Don't add per-block CSS offsets.
- Block refs come from `bind:this={blocks[i]}` inside `{#each Array(5) as _, i (i)}`. The `(i)` key is mandatory or Svelte may reuse nodes and GSAP targets go stale.
- `scatterBlocks()` iterates with `forEach` and calls `gsap.to(block, …)` per block (independent random `x`/`y`/`rotation`, `power3.out`); `recallBlocks()` is one batched `gsap.to(blocks, …)` with `stagger: 0.1` and `elastic.out(1, 0.5)` for the bouncy snap home. The eases are doing real work — swapping for `power*` makes the recall feel sterile.
- Initial scatter fires from `onMount` (intentionally one-shot). Don't "modernize" to `$effect` without preserving the single-fire behavior.

TicTacToe-specific notes:

- Minimax uses depth-weighted scoring (`10 - depth` for player wins, `depth - 10` for AI wins) so the AI prefers fastest win and slowest loss — without depth weighting it draws fine but feels indifferent, e.g. it may not block obvious threats first.
- `play()` snapshots the board with `[...board]` before passing to minimax so the recursive mutation runs on a plain array, not the `$state` proxy. Don't pass the proxy directly — proxy reads/writes during the 9!-deep recursion add measurable overhead and risk reactive thrash.
- AI move is awaited behind a 280 ms `setTimeout` purely for "thinking" feel; the search itself is instant on 3×3.

Extending the section (adding a sixth game, drag/drop, etc.):

- Add `id` + `label` + `blurb` to the `games` array in `InteractivePlayground.svelte` and add a corresponding `{:else if}` branch — that's the entire registration.
- If you add a GSAP plugin like `Draggable`, register it the same way `src/lib/actions/scrollReveal.ts` registers `ScrollTrigger` (import from `gsap/dist/<Plugin>`, call `gsap.registerPlugin` inside a `typeof window !== 'undefined'` guard) so SSR doesn't break.
- Avoid emoji literals in game content — Memory uses Unicode geometric symbols (`◆ ◉ ⬢ ▲ ● ■`), which render as typographic glyphs in the regular font and inherit `text-*` colors. Real emoji would force colored fonts and clash with the warm/cream palette.

## Conventions worth knowing

- `$lib` alias points to `src/lib/`.
- Unused vars prefixed with `_` are allowed (eslint `argsIgnorePattern`/`varsIgnorePattern: '^_'`).
- `svelte/no-navigation-without-resolve` is disabled — anchor-based nav is intentional.
- The site is single-page; if you find yourself adding a `src/routes/<name>/` directory, double-check that's actually wanted rather than a new section component.
