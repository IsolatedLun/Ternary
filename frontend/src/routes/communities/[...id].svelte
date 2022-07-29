<script>
	import Community from '../../components/Layouts/Community/Community.svelte';
	import { page } from '$app/stores';

	let id = Number($page.params.id.split('/')[0]);
</script>

<Community {id} />
