<script lang="ts">
	import { ICON_PLUS } from '../../../../consts';
	import FlexyCenter from '../../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../../components/Interactibles/Button.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import Profile from '../../Profile/Profile.svelte';
	import type { Props_GroupInvite } from '../types';

	function handleJoin() {
		// Add joining POST request
		// ...

		if (hasJoined) {
			props.members--;
			hasJoined = false;
		} else {
			props.members++;
			hasJoined = true;
		}
	}

	export let props: Props_GroupInvite = {
		id: -1,
		members: 0,
		name: '',
		profile: ''
	};

	let hasJoined = false;
</script>

<div class="[ misc__group ] [ flex align-items-center justify-content-space-between ]">
	<FlexyCenter cubeClass={{ utilClass: 'fs-300' }} useJustify={true} props={{ gap: 1 }}>
		<Profile props={{ src: props.profile, alt: `${props.name} group profile` }} />
		<a href={`/groups/${props.id}`}>g/{props.name}</a>
	</FlexyCenter>
	<FlexyCenter>
		<p class="[ group__members ] [ fs-300 text-muted ]">{props.members} members</p>
		<Button
			cubeClass={{ utilClass: 'flex align-items-center border-radius-100vw' }}
			variant={hasJoined ? 'primary' : 'primary-difference'}
			secondaryVariant="join"
			on:click={handleJoin}
		>
			{#if hasJoined}
				Joined
			{:else}
				<Icon cubeClass={{ utilClass: 'margin-inline-end-1' }}>{ICON_PLUS}</Icon>
				Join
			{/if}
		</Button>
	</FlexyCenter>
</div>
