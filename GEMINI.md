## 🛑 CRITICAL DEVELOPMENT DIRECTIVES

1. _PACKAGE MANAGER STRICT ENFORCEMENT:_ You MUST ONLY use bun for all package management commands (bun install, bun add, bun run, bunx). Under NO circumstances should you output commands using npm, yarn, or pnpm. Translate any external documentation to bun equivalents automatically.
2. _SVELTE 5 EXCLUSIVITY:_ Use Svelte 5 Runes ($state, $derived, $effect, $props) exclusively. Do not use legacy Svelte 4 reactivity or lifecycle hooks.
3. _STYLING RULES:_ Strictly use Tailwind CSS for styling. Avoid writing custom CSS in `<style>` blocks unless absolutely necessary for complex animations or pseudo-elements that Tailwind cannot handle easily.

## ⚙️ Project Configuration

- _Language:_ TypeScript
- _Framework:_ SvelteKit (Svelte 5)
- _Package Manager:_ bun
- _Add-ons:_ prettier, eslint, vitest, tailwindcss, sveltekit-adapter, devtools-json, mcp

## 🧑‍💻 Project Context: Personal Portfolio

- _Author:_ James Paul L. Tulod (Full-Stack Software Engineer)
- _Goal:_ A highly interactive, performant portfolio showcasing work experience, projects, and skills.
- _Design Language:_ Warm, aesthetic, centered layout.

## 🛠️ Svelte MCP Workflow (Standard Operating Procedure)

You have access to the Svelte MCP server. You MUST follow this exact sequence when writing or querying Svelte code:

1. **DISCOVER (list-sections):** When asked about a Svelte/SvelteKit topic, ALWAYS use this tool first to find relevant documentation sections.
2. **READ (get-documentation):** Analyze the use_cases from Step 1, then use this tool to fetch ALL relevant documentation sections before writing code.
3. **VALIDATE (svelte-autofixer):** You MUST run your drafted Svelte code through this tool before presenting it to the user. Address all issues. Keep calling it until no issues/suggestions remain.
4. **SHARE (playground-link):** After delivering the final code to the user, ask if they want a Svelte Playground link. ONLY generate it upon user confirmation, and NEVER if the code was written directly to their local files.
