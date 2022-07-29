<script lang="ts">
	import TextInput from '../../../../components/Interactibles/Input/TextInput.svelte';
	import Icon from '../../../../components/Modules/Icon/Icon.svelte';
	import LinkButton from '../../../../components/Interactibles/LinkButton.svelte';
	import Card from '../../../../components/Modules/Card/Card.svelte';
	import { ICON_IMAGE, ICON_LINK, POST_SELECT_VALUES } from '../../../../consts';
	import Select from '../../../../components/Modules/Dropdown/Select.svelte';
</script>

<header class="[ flex-direction-column gap-2 ]">
	<Card cubeClass={{ utilClass: 'flex align-items-center gap-1 padding-1' }} variant="difference">
		<a href="/create" class="[ width-100 ]">
			<TextInput
				cubeClass={{ utilClass: 'width-100' }}
				placeholder="Create post"
				variant="primary"
			/>
		</a>
		<LinkButton variant="icon-block" to="/create?type=media">
			<Icon>{ICON_IMAGE}</Icon>
		</LinkButton>
		<LinkButton variant="icon-block" to="/create?type=link">
			<Icon>{ICON_LINK}</Icon>
		</LinkButton>
	</Card>

	<Card
		cubeClass={{ utilClass: 'flex align-items-center gap-3 padding-1 margin-block-start-2' }}
		variant="difference"
	>
		<TextInput
			cubeClass={{ utilClass: 'width-100' }}
			placeholder="Search posts"
			variant="primary"
		/>
		<Select selectText="Sort by" options={POST_SELECT_VALUES} />
	</Card>
</header>
