<script lang="ts">
	import FlexyCenter from '../Divs/FlexyCenter.svelte';
	import { getPost } from '../../services/postFetchers';
	import Card from '../Modules/Card/Card.svelte';
	import FetchyError from '../Modules/FetchyError/FetchyError.svelte';
	import Post from '../Modules/Post/Post.svelte';
	import PostComment from '../Modules/Post/_Parts/PostComment.svelte';
	import Button from '../Interactibles/Button.svelte';
	import TextArea from '../Interactibles/Input/TextArea.svelte';

	export let id: number = -1;

	const postPromise = getPost(id);
</script>

<div class="[ post-view ] [ feed ] [ grid ]" data-grid-collapse>
	{#await postPromise}
		<h1>LOADING</h1>
	{:then post}
		<section class="[ width-100 ]">
			<Post props={{ ...post }} isInThread={true} />

			<FlexyCenter cubeClass={{ utilClass: 'margin-block-start-3' }}>
				<TextArea placeholder="Add comment" />
				<Button variant="primary">Comment</Button>
			</FlexyCenter>

			<Card
				cubeClass={{
					compostClass: 'card',
					utilClass: 'height-max-content margin-block-2 padding-2'
				}}
				variant="difference"
			>
				<p class="[ under-border ] [ fs-500 fw-normal ]">{post.comments.length} Comments</p>

				{#each post.comments as comment}
					<PostComment {comment} />
				{/each}
			</Card>
		</section>
	{:catch err}
		<FetchyError {err} />
	{/await}

	<section class="[ miscellaneous ]" data-desktop>
		<p>Misc</p>
	</section>
</div>
