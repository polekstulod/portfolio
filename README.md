# James Paul L. Tulod | Personal Portfolio

A highly interactive, performant personal portfolio website showcasing my work experience, projects, and skills. Built with the latest Svelte 5 runes, styled with Tailwind CSS, and animated using GSAP and native Svelte transitions.

## 🚀 Features

- **Modern Tech Stack**: Built exclusively with Svelte 5 (using `$state`, `$derived`, `$effect`, and `$props` runes) for fine-grained reactivity without the overhead of a virtual DOM.
- **Rich Aesthetics & Theming**: Features a warm, peach/cream-inspired aesthetic with deep terracotta accents (`#c05c47`). Uses a combination of elegant serif (`Cormorant Garamond`) and clean sans-serif (`Inter`) typography.
- **Interactive Playground**: A tabbed showcase of five mini-games demonstrating different JavaScript skills:
  - **Scatter** — GSAP physics: scatter and recall blocks with randomized transforms and elastic ease.
  - **Tic-Tac-Toe** — Unbeatable AI built on depth-weighted minimax (player can only draw, never win).
  - **Reaction** — Color-change reaction timer with a five-state state machine and `localStorage` high score.
  - **Memory** — 12-card pair-matching game with Fisher–Yates shuffle and async flip-back.
  - **Conway's Life** — Toroidal cellular automaton with play/step/randomize/clear controls.
- **Dynamic Content Views**: Uses Svelte 5 state management to seamlessly toggle between "Professional Experience" and "Personal Projects" without full page reloads, accompanied by smooth `fly` and `fade` transitions.
- **Responsive & Accessible**: Fully responsive layout optimized for mobile, tablet, and desktop viewports, using Tailwind CSS utility classes.
- **Micro-Interactions**: Incorporates tactile hover states, floating cards, glowing borders, and a custom global "Toy Hammer" click effect.

## 🛠️ Built With

- **Framework:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP](https://gsap.com/) & Svelte Transitions
- **Language:** TypeScript
- **Package Manager:** [bun](https://bun.sh/)
- **Linting & Formatting:** ESLint, Prettier, Svelte-Check

## 📦 Getting Started

### Prerequisites

Ensure you have [bun](https://bun.sh/) installed on your machine, as this project strictly enforces bun for package management.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/polekstulod/portfolio.git
   cd portfolio
   ```

2. Install dependencies using bun:
   ```bash
   bun install
   ```

### Development Server

Start the development server on `localhost:5173`:

```bash
bun run dev
```

### Formatting & Linting

To ensure code quality and formatting, run:

```bash
bun run format
bun run lint
bun run check
```

## 🏗️ Project Structure

- `src/app.html` - The main HTML template where Google Fonts are imported.
- `src/routes/+layout.svelte` - The global layout wrapper.
- `src/routes/layout.css` - Contains the Tailwind v4 configuration, theme colors, and font definitions.
- `src/routes/+page.svelte` - The main entry point combining all sections.
- `src/lib/components/` - Contains all modular Svelte components:
  - `Header.svelte` - Navigation bar with smooth scroll and hover animations.
  - `HeroSection.svelte` - Introduction and global click effects.
  - `ExperienceToggle.svelte` - Manages the state between Work and Projects.
  - `WorkExperience.svelte` - Timeline of professional roles.
  - `Projects.svelte` - Grid of personal and featured projects.
  - `SkillsGrid.svelte` - Interactive technical skills display.
  - `InteractivePlayground.svelte` - Tabbed orchestrator for the mini-game showcase.
  - `ContactSection.svelte` - Footer and links.
- `src/lib/components/playground/` - One file per mini-game:
  - `ScatterBlocks.svelte` - GSAP scatter/recall toy.
  - `TicTacToe.svelte` - Minimax AI with win/draw/loss tally.
  - `ReactionTest.svelte` - Reaction-time state machine with `localStorage` best.
  - `MemoryMatch.svelte` - Pair-matching game with shuffled deck.
  - `GameOfLife.svelte` - Conway's Game of Life on a toroidal grid.
- `src/lib/actions/scrollReveal.ts` - GSAP `ScrollTrigger`-powered Svelte action that fades sections into view on scroll.
- `src/lib/data/portfolio.ts` - A central store for all text data (experience, skills, projects) keeping components clean.

## 📄 License

&copy; 2026 James Paul L. Tulod. All rights reserved.
