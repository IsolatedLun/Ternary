<script>
	import { page } from '$app/stores';
	import PostView from '../../components/Views/PostView.svelte';

	let id = Number($page.params.id.split('/')[0]);
	console.log(id);
</script>

<PostView {id} />
