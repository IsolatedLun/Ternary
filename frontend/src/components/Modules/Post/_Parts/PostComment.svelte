<script lang="ts">
	import Button from '../../../../components/Interactibles/Button.svelte';
	import { voteComment } from '../../../../services/postFetchers';
	import { createDefaultComment } from '../../../../utils/defaultCreates';
	import StatController from '../../StatController/StatController.svelte';
	import StatDisplay from '../../StatController/StatDisplay.svelte';
	import UserRepr from '../../User/UserRepr.svelte';
	import type { Props_PostComment, Props_PostReply } from '../types';
	import PostCommentReply from './PostCommentReply.svelte';

	export let comment: Props_PostComment<Props_PostReply[]> = createDefaultComment([]);
	export let canVote = false;

	let showReplies = false;
</script>

<div class="[ pos-relative padding-2 margin-block-1 flex-direction-column gap-2 ]">
	<div class="[ comment ] [  ] [ flex-direction-column ]">
		<div>
			<UserRepr user={comment.user} />
			<p class="[ margin-inline-start-2 margin-block-start-2 fs-350 ]">
				{comment.text}
			</p>
		</div>

		{#if canVote}
			<StatController
				on:vote={(e) =>
					voteComment({
						votes: e.detail.votes,
						postId: comment.post,
						commentId: comment.id,
						type: e.detail.type
					})}
				props={{
					votes: comment.votes,
					comments: comment.replies.length,
					action: comment.vote_type
				}}
			>
				<div slot="otherControls" class="[ margin-inline-1 ]">
					<Button on:click={() => (showReplies = !showReplies)}>
						{#if showReplies}
							Hide replies
						{:else}
							Show replies
						{/if}
					</Button>
				</div>
			</StatController>
		{:else}
			<StatDisplay props={{ votes: comment.votes, comments: comment.replies.length }}>
				<div slot="otherControls" class="[ margin-inline-1 ]">
					<Button on:click={() => (showReplies = !showReplies)}>
						{#if showReplies}
							Hide replies
						{:else}
							Show replies
						{/if}
					</Button>
				</div>
			</StatDisplay>
		{/if}
	</div>

	<div class="[ replies ]">
		{#if showReplies}
			{#each comment.replies as reply}
				<PostCommentReply reply={{ ...reply }} />
			{/each}
		{/if}
	</div>
</div>
