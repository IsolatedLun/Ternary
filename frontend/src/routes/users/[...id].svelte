<script>
	import { page } from '$app/stores';
	import UserView from '../../components/Views/UserView.svelte';

	let id = Number($page.params.id.split('/')[0]);
</script>

<UserView {id} />
