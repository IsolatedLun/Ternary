<script lang="ts">
	import { authenticate } from '../services/authFetchers';
	import { onMount } from 'svelte';
	import Navbar from '../components/Layouts/Navbar.svelte';
	import { locationState } from '../stores/locationStore/locationStore';
	import { toggleDropdowns } from '../utils/generalFuncs';

	onMount(() => {
		authenticate();

		var observer = new MutationObserver(updateLocationState);
		observer.observe(document.body, { attributes: true });

		window.addEventListener('click', (e) => {
			toggleDropdowns(e, 'dropdown-toggler');
		});
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
