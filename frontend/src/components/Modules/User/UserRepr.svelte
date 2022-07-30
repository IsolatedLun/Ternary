<script lang="ts">
	import type { Props_Community } from 'src/components/Layouts/Community/types';

	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import { API_URL } from '../../../consts';
	import type { Props_User } from '../../../types';
	import Numeric from '../Numeric/Numeric.svelte';
	import Profile from '../Profile/Profile.svelte';

	export let user: Props_User = {
		username: '',
		honor: 0,
		id: 0,
		date_created: '',
		profile: ''
	};

	export let community: Props_Community<null, number> = {
		id: -1,
		banner: '',
		profile: '',
		members: 0,
		posts: null,
		name: '',
		date_created: ''
	};

	export let type = 'user';
</script>

<div class="[ user-repr ] [ flex gap-1 margin-block-end-05 ]">
	{#if type === 'user'}
		<Profile
			props={{ src: API_URL + user.profile, alt: `${user.username}'s profile` }}
			useRandFilter={user.profile.includes('def.png')}
		/>

		<div class="[ user__info ]">
			<FlexyCustom useColumn={true} align="center">
				<p class="[ fs-300 ]">
					<a href={`/users/${user.id}`}>u/{user.username}</a>
				</p>
				<p class="[ fs-300 text-muted ]"><Numeric num={user.honor} /> honor</p>
			</FlexyCustom>
		</div>
	{:else}
		<Profile
			props={{ src: API_URL + community.profile, alt: `${community.name} community profile` }}
		/>

		<div class="[ user__info ] [ fs-300 ]">
			<FlexyCustom useColumn={true} align="start">
				<p>
					<a href={`/communities/${community.id}/${community.name}`}>g/{community.name}</a>
					<span class="[ long-bar ]" />
					<a href="/users">u/{user.username}</a>
				</p>
			</FlexyCustom>
		</div>
	{/if}
</div>
