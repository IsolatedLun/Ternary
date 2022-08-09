<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import type { Props_Community } from 'src/components/Layouts/Community/types';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import { API_URL, ICON_SHIELD, ICON_USER } from '../../../consts';
	import type { Props_User } from '../../../types';
	import Icon from '../Icon/Icon.svelte';
	import Profile from '../Profile/Profile.svelte';
	import { createDefaultUser, createDefaultCommunity } from '../../../utils/defaultCreates';

	export let user: Props_User = createDefaultUser();
	export let is_owner = false;
	export let is_moderator = false;

	export let community: Props_Community<null, number> = createDefaultCommunity();
</script>

<div class="[ user-repr ] [ flex gap-1 margin-block-end-05 ]">
	<Profile
		props={{
			src: API_URL + (community && community.id > 0 ? community.profile : user.profile),
			alt: `${community ? community.name : user.username} community profile`
		}}
	/>

	<div class="[ user__info ] [ fs-300 ]">
		<FlexyCustom align="start" justify="center">
			<p>
				{#if community && community.id > 0}
					<a href={`/communities/${community.id}/${community.name}`}>g/{community.name}</a>
					<span class="[ long-bar ]" />
				{/if}
				<a href={`/users/${user.id}/${user.username}`}>u/{user.username}</a>
			</p>

			<FlexyCenter cubeClass={{ utilClass: 'fs-300' }} props={{ gap: 1 }}>
				{#if is_owner}
					<Icon cubeClass={{ utilClass: 'clr-upvote-400' }}>{ICON_USER}</Icon>
				{/if}
				{#if is_moderator}
					<Icon cubeClass={{ utilClass: 'clr-downvote-400' }}>{ICON_SHIELD}</Icon>
				{/if}
			</FlexyCenter>
		</FlexyCustom>
	</div>
</div>
