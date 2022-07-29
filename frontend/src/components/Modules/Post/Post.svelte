<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import Video from '../MediaElements/Video.svelte';
	import PostImages from './_Parts/PostImages.svelte';
	import LinkButton from '../../../components/Interactibles/LinkButton.svelte';
	import UserRepr from '../User/UserRepr.svelte';
	import StatController from '../StatController/StatController.svelte';
	import PostUrl from './_Parts/PostUrl.svelte';
	import { API_URL } from '../../../consts';
	import { createTestPost } from './_funcs';
	import { votePost } from '../../../services/postFetchers';

	export let props: import('./types').Props_Post<any, any> = createTestPost(
		'Wow, so boring',
		0,
		'text'
	);

	export let isInThread = false;
</script>

<div
	class="[ post ] [ flex-direction-column justify-content-space-between card padding-1 ]"
	data-variant="difference"
	data-content-type={props.content_type}
	data-in-thread={isInThread}
>
	<header class="[ under-border ]">
		<FlexyCenter useJustify={false}>
			<UserRepr user={props.user} />
			<p class="[ fs-350 align-self-start text-muted ]">on {props.date_created}</p>
		</FlexyCenter>
		<p class="[ fs-500 ]">{props.title}</p>
	</header>
	<article class="[ post__content ] [ margin-block-1 hyphens-auto overflow-hidden pos-relative ]">
		{#if props.content_type === 'text'}
			{props.content}
		{:else if props.content_type === 'link'}
			<PostUrl content={props.content} />
		{:else if props.content_type === 'image'}
			<PostImages title={props.title} images={props.content} />
		{:else if props.content_type === 'video'}
			<Video props={{ src: API_URL + props.content }} />
		{/if}
	</article>
	<footer
		class="[ flex gap-1 align-items-center justify-content-space-between ] [ margin-block-start-auto upper-border ]"
	>
		<FlexyCenter useJustify={false} props={{ gap: 1 }}>
			{#if !isInThread}
				<LinkButton ariaLabel="Open thread" variant="action" to={`/threads/${props.id}`}>
					View thread
				</LinkButton>
			{/if}
		</FlexyCenter>

		<StatController
			on:vote={(e) => votePost({ votes: e.detail.votes, postId: props.id })}
			props={{ votes: props.votes, comments: props.comments, action: 'neutral' }}
		/>
	</footer>
</div>
