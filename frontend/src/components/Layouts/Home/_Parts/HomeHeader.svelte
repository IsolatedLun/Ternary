<script lang="ts">
	import TextInput from '../../../../components/Interactibles/Input/TextInput.svelte';
	import Icon from '../../../../components/Modules/Icon/Icon.svelte';
	import LinkButton from '../../../../components/Interactibles/LinkButton.svelte';
	import Card from '../../../../components/Modules/Card/Card.svelte';
	import { ICON_IMAGE, ICON_LINK } from '../../../../consts';
	import Select from '../../../../components/Modules/Dropdown/Select.svelte';
</script>

<header class="[ flex-direction-column gap-2 ]">
	<Card cubeClass={{ utilClass: 'flex align-items-center gap-1 padding-1' }} variant="difference">
		<TextInput cubeClass={{ utilClass: 'width-100' }} placeholder="Create post" variant="primary" />
		<LinkButton variant="icon-block">
			<Icon>{ICON_IMAGE}</Icon>
		</LinkButton>
		<LinkButton variant="icon-block">
			<Icon>{ICON_LINK}</Icon>
		</LinkButton>
	</Card>

	<Card
		cubeClass={{ utilClass: 'flex align-items-center gap-1 padding-1 margin-block-start-2' }}
		variant="difference"
	>
		<TextInput
			cubeClass={{ utilClass: 'width-100' }}
			placeholder="Search posts"
			variant="primary"
		/>
		<Select selectText="Sort by" options={['Top', 'Controversial']} />
	</Card>
</header>
