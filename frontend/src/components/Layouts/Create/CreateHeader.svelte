<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { API_URL, ICON_IMAGE, ICON_LINK, ICON_TEXT } from '../../../consts';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Profile from '../../../components/Modules/Profile/Profile.svelte';

	function handleChangeType(type: string) {
		dispatch('typeChange', { data: type });
	}

	const dispatch = createEventDispatcher();

	const [communityName, communityId, communityProfile] = [
		String($page.url.searchParams.get('communityName')),
		Number($page.url.searchParams.get('communityId')),
		String($page.url.searchParams.get('communityProfile'))
	];

	const validCommunity = communityId > 0 && communityName && communityProfile;
</script>

<FlexyCustom align="center" justify={validCommunity ? 'space-between' : 'center'}>
	<nav aria-label="Create post navigation">
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<ul
			role="list"
			class="[ card ] [ flex align-items-center margin-inline-auto width-max-content ]"
			data-variant="dark"
		>
			<li>
				<a
					on:click={() => handleChangeType('text')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=text"
					data-variant="">Text <Icon>{ICON_TEXT}</Icon></a
				>
			</li>
			<li>
				<a
					on:click={() => handleChangeType('media')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=media"
					data-variant="">Media <Icon>{ICON_IMAGE}</Icon></a
				>
			</li>
			<li>
				<a
					on:click={() => handleChangeType('link')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=link"
					data-variant="">Link <Icon>{ICON_LINK}</Icon></a
				>
			</li>
		</ul>
	</nav>

	{#if validCommunity}
		<Card variant="dark" cubeClass={{ utilClass: 'flex align-items-center gap-1 padding-1' }}>
			<p>For:</p>
			<Profile props={{ src: API_URL + communityProfile, alt: `${communityName} profile` }} />
			<a class="[ fs-350 ]" href={`/communities/${communityId}/${communityName}`}
				>g/{communityName}</a
			>
		</Card>
	{/if}
</FlexyCustom>
