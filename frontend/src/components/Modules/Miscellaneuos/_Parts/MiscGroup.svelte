<script lang="ts">
	import { API_URL, ICON_PLUS } from '../../../../consts';
	import FlexyCenter from '../../../../components/Divs/FlexyCenter.svelte';
	import Button from '../../../../components/Interactibles/Button.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import Profile from '../../Profile/Profile.svelte';
	import type { Props_Community } from 'src/components/Layouts/Community/types';
	import Numeric from '../../Numeric/Numeric.svelte';
	import { joinCommunity } from '../../../../services/communityFetchers';
	import { createDefaultCommunity } from '../../../../utils/defaultCreates';

	function handleJoin() {
		joinCommunity(props.id).then((res) => {
			hasJoined = res;

			if (!hasJoined) {
				props.members--;
				hasJoined = false;
			} else {
				props.members++;
				hasJoined = true;
			}
		});
	}

	export let props: Props_Community<null, number> = createDefaultCommunity();

	let hasJoined = false;
</script>

<div class="[ misc__group ] [ flex align-items-center justify-content-space-between ]">
	<FlexyCenter cubeClass={{ utilClass: 'fs-300' }} useJustify={true} props={{ gap: 1 }}>
		<Profile props={{ src: API_URL + props.profile, alt: `${props.name} group profile` }} />
		<a href={`/communities/${props.id}/${props.name}`}>g/{props.name}</a>
	</FlexyCenter>
	<FlexyCenter>
		<p class="[ group__members ] [ fs-300 text-muted ]"><Numeric num={props.members} /> members</p>
		{#if props.showJoin}
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
		{/if}
	</FlexyCenter>
</div>
