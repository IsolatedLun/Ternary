<script lang="ts">
	import FlexyCenter from '../Divs/FlexyCenter.svelte';
	import { commentOnPost, getPost } from '../../services/postFetchers';
	import Card from '../Modules/Card/Card.svelte';
	import CardWithHeader from '../Modules/Card/CardWithHeader.svelte';
	import FetchyError from '../Modules/FetchyError/FetchyError.svelte';
	import Post from '../Modules/Post/Post.svelte';
	import PostComment from '../Modules/Post/_Parts/PostComment.svelte';
	import Button from '../Interactibles/Button.svelte';
	import TextArea from '../Interactibles/Input/TextArea.svelte';
	import type {
		Props_Post,
		Props_PostComment,
		Props_PostCommentReply
	} from '../Modules/Post/types';
	import Miscellaneuos from '../Modules/Miscellaneuos/Miscellaneuos.svelte';
	import LoadingBar from '../Modules/Bars/LoadingBar.svelte';
	import { userState } from '../../stores/userStore/userStore';

	async function postPromise() {
		post = await getPost(id);
	}

	async function handleAddComment() {
		if (newComment.length > 0)
			commentOnPost({ text: newComment, postId: id }).then((data) => {
				post.comments = [...post.comments, data];

				newComment = '';
			});
	}

	export let id: number = -1;

	let { isLogged } = $userState;
	let post: Props_Post<Props_PostComment<Props_PostCommentReply[]>[], any>;
	let newComment = '';
</script>

{#key isLogged}
	<div class="[ post-view ] [ feed ] [ grid ]" data-grid-collapse>
		{#await postPromise()}
			<LoadingBar />
		{:then _}
			<section class="[ width-100 ]">
				<Post props={{ ...post }} isInThread={true} canVote={isLogged} />

				<FlexyCenter cubeClass={{ utilClass: 'margin-block-start-3' }}>
					<TextArea placeholder="Add comment" bind:value={newComment} />
					<Button
						workCondition={newComment.length > 0 && isLogged}
						variant="primary"
						on:click={handleAddComment}>Comment</Button
					>
				</FlexyCenter>

				<Card
					cubeClass={{
						blockClass: 'comments',
						compostClass: 'card',
						utilClass: 'height-max-content margin-block-2 padding-2 pos-relative'
					}}
					variant="difference"
				>
					<p class="[ under-border ] [ fs-500 fw-normal ]">{post.comments.length} Comment(s)</p>

					{#each post.comments as comment}
						<PostComment {comment} canVote={isLogged} />
					{/each}
				</Card>
			</section>
		{:catch err}
			<FetchyError {err} />
		{/await}

		<Miscellaneuos>
			<CardWithHeader
				title="Related Posts"
				cubeClass={{ utilClass: 'padding-1' }}
				variant="difference"
			/>
		</Miscellaneuos>
	</div>
{/key}
