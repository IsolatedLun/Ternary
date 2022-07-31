<script>
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import LinkButton from '../../../components/Interactibles/LinkButton.svelte';
	import { ICON_IMAGE, ICON_LINK } from '../../../consts';
	import Card from '../Card/Card.svelte';
	import Icon from '../Icon/Icon.svelte';

	export let communityId = -1;
	export let communityName = '';
	export let communityProfile = '';
</script>

<Card
	cubeClass={{ utilClass: 'flex align-items-center gap-1 padding-1 margin-block-end-2' }}
	variant="difference"
>
	<a
		href={`/create?communityId=${communityId}&communityName=${communityName}&communityProfile=${communityProfile}`}
		class="[ width-100 ]"
	>
		<TextInput cubeClass={{ utilClass: 'width-100' }} placeholder="Create post" variant="primary" />
	</a>
	<LinkButton
		variant="icon-block"
		to={`/create?type=media&communityId=${communityId}&communityName=${communityName}&communityProfile=${communityProfile}`}
	>
		<Icon>{ICON_IMAGE}</Icon>
	</LinkButton>
	<LinkButton
		variant="icon-block"
		to={`/create?type=link&communityId=${communityId}&communityName=${communityName}&communityProfile=${communityProfile}`}
	>
		<Icon>{ICON_LINK}</Icon>
	</LinkButton>
</Card>
