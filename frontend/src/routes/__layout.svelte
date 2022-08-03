<script lang="ts">
	import { authenticate } from '../services/authFetchers';
	import { onMount } from 'svelte';
	import Navbar from '../components/Layouts/Navbar.svelte';
	import { userState } from '../stores/userStore/userStore';
	import { locationState } from '../stores/locationStore/locationStore';

	onMount(() => {
		authenticate();

		var observer = new MutationObserver(updateLocationState);
		observer.observe(document.body, { attributes: true });
	});

	function updateLocationState() {
		locationState.set({ history: [...$locationState.history, location.href] });
	}
</script>

<Navbar />

<main class="[ main-container ] [ margin-block-2 gap-2 margin-inline-auto ]" data-grid-collapse>
	<slot />
</main>

<style>
	@import url('../../static/posty.css');
</style>
