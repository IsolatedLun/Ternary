<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../components/Interactibles/Button.svelte';
	import { ICON_COMMENTS, ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Icon from '../Icon/Icon.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import { lenArrOrNum } from '../Post/_funcs';

	export let props: import('./types').Props_StatDisplay = {
		comments: 0,
		votes: 0
	};
</script>

<FlexyCenter useJustify={false} props={{ gap: 1 }} cubeClass={{ utilClass: 'justify-content-end' }}>
	<slot name="otherControls" />

	<FlexyCenter props={{ gap: 1 }}>
		<Icon cubeClass={{ utilClass: 'text-muted' }} ariaLabel="Comments">{ICON_COMMENTS}</Icon>
		<p>{lenArrOrNum(props.comments)}</p>
	</FlexyCenter>

	<span class="[ text-muted fs-300 margin-inline-1 ]">|</span>

	<Button
		ariaLabel="Upvote"
		variant="transparent"
		workCondition={false}
		secondaryVariant={props.votes > 0 ? 'upvote' : 'null'}
	>
		<Icon ariaLabel="Upvote">{ICON_UPVOTE}</Icon>
	</Button>

	<p class={props.votes > 0 ? '[ clr-upvote-400 ]' : props.votes < 0 ? '[ clr-downvote-400 ]' : ''}>
		{#key props.votes}
			<Numeric num={props.votes} />
		{/key}
	</p>

	<Button
		ariaLabel="Downvote"
		variant="transparent"
		workCondition={false}
		secondaryVariant={props.votes < 0 ? 'downvote' : 'null'}
	>
		<Icon ariaLabel="Downvote">{ICON_DOWNVOTE}</Icon>
	</Button>
</FlexyCenter>
