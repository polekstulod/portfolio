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
		<a href="#" class="font-serif text-2xl font-bold transition-opacity hover:opacity-80">
			J.P.T.
		</a>
		<ul class="flex gap-6 text-sm font-medium tracking-wide">
			{#each links as link (link.name)}
				<li>
					<a href={link.href} class="transition-colors duration-300 hover:text-accent">
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
