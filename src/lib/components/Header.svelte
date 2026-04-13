<script lang="ts">
	let links = [
		{ name: 'About', href: '#about' },
		{ name: 'Experience', href: '#experience' },
		{ name: 'Playground', href: '#playground' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

<header class="sticky top-0 z-50 border-b border-secondary/50 bg-primary/80 py-6 backdrop-blur-md">
	<nav class="mx-auto flex max-w-4xl items-center justify-between px-4">
		<a
			href="#"
			class="font-serif text-3xl font-bold transition-transform duration-300 hover:scale-105 hover:opacity-80 active:scale-95"
		>
			J.P.T.
		</a>
		<ul class="flex gap-8 text-sm font-medium tracking-wide">
			{#each links as link (link.name)}
				<li>
					<a
						href={link.href}
						class="group relative inline-block transition-colors duration-300 hover:text-accent active:scale-95"
					>
						{link.name}
						<span
							class="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-accent transition-all duration-300 ease-out group-hover:w-full"
						></span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
