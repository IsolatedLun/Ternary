<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import { API_URL, ICON_SHIELD, ICON_USER } from '../../../consts';
	import type { Props_User } from '../../../types';
	import Icon from '../Icon/Icon.svelte';
	import Numeric from '../Numeric/Numeric.svelte';
	import Profile from '../Profile/Profile.svelte';

	export let user: Props_User = {
		username: '',
		honor: 0,
		id: 0,
		date_created: '',
		profile: '',
		is_staff: false
	};
	export let is_owner = false;
	export let is_moderator = false;
</script>

<div class="[ user-repr ] [ flex gap-1 margin-block-end-05 ]">
	<Profile
		props={{ src: API_URL + user.profile, alt: `${user.username}'s profile` }}
		useRandFilter={user.profile.includes('def.png')}
	/>

	<div class="[ user__info ]">
		<FlexyCustom useColumn={true} align="center">
			<div class="[ flex gap-1 ]">
				<p class="[ fs-300 ]">
					<a href={`/users/${user.id}`}>u/{user.username}</a>
				</p>
				<FlexyCenter cubeClass={{ utilClass: 'fs-300' }} props={{ gap: 1 }}>
					{#if is_owner}
						<Icon cubeClass={{ utilClass: 'clr-upvote-400' }}>{ICON_USER}</Icon>
					{/if}
					{#if is_moderator}
						<Icon cubeClass={{ utilClass: 'clr-downvote-400' }}>{ICON_SHIELD}</Icon>
					{/if}
				</FlexyCenter>
			</div>
			<p class="[ fs-300 text-muted ]"><Numeric num={user.honor} /> honor</p>
		</FlexyCustom>
	</div>
</div>
