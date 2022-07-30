<script lang="ts">
	import { ICON_ERROR } from '../../../consts';
	import LinkButton from '../../../components/Interactibles/LinkButton.svelte';
	import Card from '../Card/Card.svelte';
	import Icon from '../Icon/Icon.svelte';
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../components/Interactibles/Button.svelte';

	export let err: string = 'Something went wrong.';
</script>

<FlexyCenter useColumn={true} props={{ gap: 3 }} cubeClass={{ blockClass: 'general-error' }}>
	<div class="[ text-center flow ]">
		<Icon cubeClass={{ utilClass: 'fs-800 clr-downvote-400' }}>{ICON_ERROR}</Icon>
		<p class="[ text-muted fs-600 ]">An Error Occurred.</p>
	</div>

	<Card cubeClass={{ utilClass: 'padding-2 clr-downvote-400' }} variant="difference">
		{err}
	</Card>

	<Button on:click={() => history.back()} variant="primary">Go back</Button>
</FlexyCenter>
