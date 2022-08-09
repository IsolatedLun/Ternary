<script lang="ts">
	import FlexyCenter from '../../../../components/Divs/FlexyCenter.svelte';
	import TextArea from '../../../../components/Interactibles/Input/TextArea.svelte';
	import Button from '../../../../components/Interactibles/Button.svelte';
	import LinkButton from '../../../../components/Interactibles/LinkButton.svelte';
	import { voteCommentReply } from '../../../../services/postFetchers';
	import { createDefaultCommentReply } from '../../../../utils/defaultCreates';
	import StatController from '../../StatController/StatController.svelte';
	import StatDisplay from '../../StatController/StatDisplay.svelte';
	import UserRepr from '../../User/UserRepr.svelte';
	import type { Props_PostCommentReply } from '../types';
	import { createEventDispatcher } from 'svelte';

	function handleAddReply() {
		dispatch('reply', {
			id: reply.id,
			text: replyText
		});

		showReplyInput = false;
		replyText = '';
	}

	export let reply: Props_PostCommentReply = createDefaultCommentReply();
	export let canVote = false;

	let showReplyInput = false;
	let replyText = '';

	const dispatch = createEventDispatcher();
</script>

<div
	class="[ comment__reply ] [ under-border ] [ fs-350 pos-relative padding-1 margin-inline-start-2 margin-block-1 flex-direction-column gap-2 ]"
>
	<div
		id={`${reply.user.username}-comment-${reply.comment}-reply-${reply.id}`}
		class="[ comment reply ] [  ] [ flex-direction-column ]"
	>
		<div>
			<UserRepr user={reply.user} />
			<p class="[ margin-inline-start-2 margin-block-start-1 fs-350 ]">
				<LinkButton
					secondaryVariant="upvote"
					cubeClass={{ utilClass: 'fw-bolder display-inline-block' }}
					to={'#' + reply.reply_to}
					>@{reply.reply_to.substring(0, reply.reply_to.indexOf('-'))}
				</LinkButton>
				{reply.text}
			</p>
		</div>

		{#if canVote}
			<StatController
				on:vote={(e) =>
					voteCommentReply({
						votes: e.detail.votes,
						postId: reply.post,
						commentId: reply.comment,
						replyId: reply.id,
						type: e.detail.type
					})}
				props={{ votes: reply.votes, comments: 0, action: reply.vote_type }}
				isReply={true}
			>
				<div slot="otherControls">
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
				</div>
			</StatController>
		{:else}
			<StatDisplay props={{ votes: reply.votes, comments: 0 }} isReply={true} />
		{/if}
	</div>

	{#if showReplyInput}
		<FlexyCenter cubeClass={{ utilClass: 'margin-block-start-3' }}>
			<TextArea placeholder={`Reply to @${reply.user.username}`} bind:value={replyText} />
			<Button
				variant="primary"
				workCondition={replyText.length > 0 && canVote}
				on:click={handleAddReply}>Reply</Button
			>
		</FlexyCenter>
	{/if}
</div>
