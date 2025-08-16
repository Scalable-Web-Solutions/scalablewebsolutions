<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Navbar from './Sections/Navbar.svelte';
	import logo from '$lib/assets/scalablewebsolutions.png'
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="overflow-x-hidden">
	<Navbar logo={logo} />
	{@render children?.()}
</div>