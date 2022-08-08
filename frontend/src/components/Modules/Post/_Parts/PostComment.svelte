<script lang="ts">
	import TextArea from '../../../../components/Interactibles/Input/TextArea.svelte';
	import FlexyCenter from '../../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../../components/Interactibles/Button.svelte';
	import { replyOnComment, voteComment } from '../../../../services/postFetchers';
	import { createDefaultComment } from '../../../../utils/defaultCreates';
	import StatController from '../../StatController/StatController.svelte';
	import StatDisplay from '../../StatController/StatDisplay.svelte';
	import UserRepr from '../../User/UserRepr.svelte';
	import type { Props_PostComment, Props_PostCommentReply } from '../types';
	import PostCommentReply from './PostCommentReply.svelte';

	async function handleAddReply() {
		replyOnComment({
			postId: comment.post,
			commentId: comment.id,
			text: replyText,
			reply_to_id: comment.id,
			type: 'comment'
		}).then((reply) => {
			showReplyInput = false;
			comment.replies = [...comment.replies, reply as any];
		});
	}

	export let comment: Props_PostComment<Props_PostCommentReply[]> = createDefaultComment([]);
	export let canVote = false;

	let showReplies = false;
	let showReplyInput = false;
	let replyText = '';
</script>

<div class="[ pos-relative padding-2 margin-block-1 flex-direction-column gap-2 ]">
	<div
		class="[ comment ] [  ] [ flex-direction-column ]"
		id={`${comment.user.username}-comment-${comment.id}`}
	>
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
				<FlexyCenter
					slot="otherControls"
					props={{ gap: 1 }}
					cubeClass={{ utilClass: 'margin-inline-end-1' }}
				>
					<Button
						on:click={() => (showReplyInput = !showReplyInput)}
						secondaryVariant={showReplyInput ? 'upvote' : ''}
					>
						{#if showReplyInput}
							Close
						{:else}
							Reply
						{/if}
					</Button>

					<Button
						on:click={() => (showReplies = !showReplies)}
						secondaryVariant={showReplies ? 'upvote' : ''}
					>
						{#if showReplies}
							Hide replies
						{:else}
							Show replies
						{/if}
					</Button>
				</FlexyCenter>
			</StatController>
		{:else}
			<StatDisplay props={{ votes: comment.votes, comments: comment.replies.length }}>
				<div slot="otherControls" class="[ margin-inline-1 ]">
					{#if comment.replies.length > 0}
						<Button on:click={() => (showReplies = !showReplies)}>
							{#if showReplies}
								Hide replie(s)
							{:else}
								Show {comment.replies.length} replies
							{/if}
						</Button>
					{/if}
				</div>
			</StatDisplay>
		{/if}
	</div>

	{#if showReplyInput}
		<FlexyCenter cubeClass={{ utilClass: 'margin-block-start-3' }}>
			<TextArea placeholder="Reply" bind:value={replyText} />
			<Button
				variant="primary"
				workCondition={replyText.length > 0 && canVote}
				on:click={handleAddReply}>Reply</Button
			>
		</FlexyCenter>
	{/if}

	<div class="[ replies ]">
		{#if showReplies}
			{#each comment.replies as reply}
				<PostCommentReply reply={{ ...reply }} {canVote} />
			{/each}
		{/if}
	</div>
</div>
