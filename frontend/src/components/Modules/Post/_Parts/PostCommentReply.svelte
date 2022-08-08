<script lang="ts">
	import LinkButton from '../../../../components/Interactibles/LinkButton.svelte';
	import { voteCommentReply } from '../../../../services/postFetchers';
	import { createDefaultCommentReply } from '../../../../utils/defaultCreates';
	import StatController from '../../StatController/StatController.svelte';
	import StatDisplay from '../../StatController/StatDisplay.svelte';
	import UserRepr from '../../User/UserRepr.svelte';
	import type { Props_PostCommentReply } from '../types';

	export let reply: Props_PostCommentReply = createDefaultCommentReply();
	export let canVote = false;
</script>

<div
	id={reply.reply_to}
	class="[ comment__reply ] [ under-border ] [ fs-350 pos-relative padding-1 margin-inline-start-2 margin-block-1 flex-direction-column gap-2 ]"
>
	<div class="[ comment reply ] [  ] [ flex-direction-column ]">
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
			/>
		{:else}
			<StatDisplay props={{ votes: reply.votes, comments: 0 }} isReply={true} />
		{/if}
	</div>
</div>
