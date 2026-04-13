<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ExperienceToggle from '$lib/components/ExperienceToggle.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import InteractivePlayground from '$lib/components/InteractivePlayground.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
</script>

<svelte:head>
	<title>James Paul L. Tulod | Full-Stack Software Engineer</title>
	<meta
		name="description"
		content="Portfolio of James Paul L. Tulod, Full-Stack Software Engineer."
	/>
</svelte:head>

<Header />

<main class="w-full">
	<HeroSection />
	<ExperienceToggle />
	<SkillsGrid />
	<InteractivePlayground />
	<ContactSection />
</main>

<footer class="border-t border-secondary/50 py-8 text-center text-sm text-text-main/50">
	<p>&copy; {new Date().getFullYear()} James Paul L. Tulod. All rights reserved.</p>
</footer>
