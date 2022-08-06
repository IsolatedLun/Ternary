<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../components/Interactibles/Button.svelte';
	import { ICON_COMMENTS, ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Icon from '../Icon/Icon.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import { downvote, lenArrOrNum, upvote } from '../Post/_funcs';

	export let props: import('./types').Props_StatController = {
		comments: 0,
		votes: 0,
		action: 'neutral'
	};

	function handleUpvote(currAction: string) {
		const [votes, action] = upvote(props.votes, currAction);

		props.votes = votes;
		props.action = action;
		handleVote(votes);
	}

	function handleDownvote(currAction: string) {
		const [votes, action] = downvote(props.votes, currAction);

		props.votes = votes;
		props.action = action;
		handleVote(votes);
	}

	function handleVote(votes: number) {
		dispatch('vote', { votes, type: props.action });
	}

	const dispatch = createEventDispatcher();
</script>

<FlexyCenter useJustify={false} props={{ gap: 1 }} cubeClass={{ utilClass: 'justify-content-end' }}>
	<slot name="otherControls" />

	<FlexyCenter props={{ gap: 1 }}>
		<Icon cubeClass={{ utilClass: 'text-muted' }} ariaLabel="Comments">{ICON_COMMENTS}</Icon>
		<p>{lenArrOrNum(props.comments)}</p>
	</FlexyCenter>

	<span class="[ text-muted fs-300 margin-inline-1 ]">|</span>

	<Button
		on:click={() => handleUpvote(props.action)}
		ariaLabel="Upvote"
		variant="action"
		secondaryVariant={props.action === 'upvote' ? 'upvote' : 'default'}
	>
		<Icon ariaLabel="Upvote">{ICON_UPVOTE}</Icon>
	</Button>

	<p class={props.votes > 0 ? '[ clr-upvote-400 ]' : props.votes < 0 ? '[ clr-downvote-400 ]' : ''}>
		{#key props.votes}
			<Numeric num={props.votes} />
		{/key}
	</p>

	<Button
		on:click={() => handleDownvote(props.action)}
		ariaLabel="Downvote"
		variant="action"
		secondaryVariant={props.action === 'downvote' ? 'downvote' : 'default'}
	>
		<Icon ariaLabel="Downvote">{ICON_DOWNVOTE}</Icon>
	</Button>
</FlexyCenter>
