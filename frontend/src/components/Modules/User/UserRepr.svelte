<script lang="ts">
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import { API_URL } from '../../../consts';
	import type { Props_User } from '../../../types';
	import Profile from '../Profile/Profile.svelte';

	export let user: Props_User = {
		username: '',
		honor: 0,
		id: 0,
		date_created: '',
		profile: ''
	};
</script>

<div class="[ user-repr ] [ flex gap-1 margin-block-end-05 ]">
	<Profile
		props={{ src: API_URL + user.profile, alt: `${user.username}'s profile` }}
		useRandFilter={user.profile.includes('def.png')}
	/>

	<div class="[ user__info ]">
		<FlexyCustom useColumn={true} align="center">
			<p class="[ fs-300 margin-block-end-05 ]">
				<a href={`/users/${user.id}`}>u/{user.username}</a>
			</p>
			<p class="[ fs-300 text-muted ]">{user.honor} honor</p>
		</FlexyCustom>
	</div>
</div>
