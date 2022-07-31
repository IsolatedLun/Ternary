<script>
	import { authenticate } from '../services/authFetchers';
	import { onMount } from 'svelte';
	import Navbar from '../components/Layouts/Navbar.svelte';

	onMount(() => {
		authenticate();
	});
</script>

<Navbar />

<main class="[ main-container ] [ margin-block-2 gap-2 margin-inline-auto ]" data-grid-collapse>
	<slot />
</main>

<style>
	@import url('../../static/posty.css');
</style>
