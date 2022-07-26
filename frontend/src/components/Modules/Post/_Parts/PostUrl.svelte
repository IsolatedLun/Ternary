<script>
	import FlexyCenter from '../../../../components/Divs/FlexyCenter.svelte';
	import { ICON_LINK } from '../../../../consts';
	import Card from '../../Card/Card.svelte';
	import Icon from '../../Icon/Icon.svelte';

	export let content = 'https://www.google.com';
</script>

<FlexyCenter useJustify={false}>
	<Card cubeClass={{ utilClass: 'padding-4 width-max-content' }}>
		<Icon>{ICON_LINK}</Icon>
	</Card>
	<a href={content} class="[ clr-upvote-400 ]">{content}</a>
</FlexyCenter>
