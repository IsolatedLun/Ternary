<script lang="ts">
	import LinkButton from '../../../../components/Interactibles/LinkButton.svelte';
	import Icon from '../../../../components/Modules/Icon/Icon.svelte';
	import CreatePostDecor from '../../../../components/Modules/CreatePostDecor/CreatePostDecor.svelte';
	import { COMMUNITY_ICON } from '../../../../consts';
</script>

<header class="[ flex-direction-column gap-2 ]">
	<CreatePostDecor>
		<LinkButton variant="icon-block" to="/create/community">
			<Icon ariaLabel="Community">{COMMUNITY_ICON}</Icon>
		</LinkButton>
	</CreatePostDecor>
</header>
