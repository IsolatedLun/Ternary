<script lang="ts">
	import { voteComment } from '../../../../services/postFetchers';
	import { createDefaultComment } from '../../../../utils/defaultCreates';
	import StatController from '../../StatController/StatController.svelte';
	import UserRepr from '../../User/UserRepr.svelte';
	import type { Props_PostComment } from '../types';

	export let comment: Props_PostComment = createDefaultComment();
</script>

<div class="[ pos-relative padding-2 margin-block-1 flex-direction-column gap-2 ]">
	<div class="[ comment ] [ under-border ] [ flex-direction-column ]">
		<div>
			<UserRepr user={comment.user} />
			<p class="[ margin-inline-start-2 margin-block-start-2 fs-350 ]">
				{comment.text}
			</p>
		</div>

		<StatController
			on:vote={(e) =>
				voteComment({
					votes: e.detail.votes,
					postId: comment.post,
					commentId: comment.id,
					type: e.detail.type
				})}
			props={{ votes: comment.votes, comments: comment.replies, action: comment.vote_type }}
		/>
	</div>
</div>
