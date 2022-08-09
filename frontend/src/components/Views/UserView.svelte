<script lang="ts">
	import { getUser } from '../../services/userFetchers';
	import { onMount } from 'svelte';
	import FlexyCenter from '../Divs/FlexyCenter.svelte';
	import FlexyCustom from '../Divs/FlexyCustom.svelte';
	import Button from '../Interactibles/Button.svelte';
	import LoadingBar from '../Modules/Bars/LoadingBar.svelte';
	import Miscellaneuos from '../Modules/Miscellaneuos/Miscellaneuos.svelte';
	import Numeric from '../Modules/Numeric/Numeric.svelte';
	import Post from '../Modules/Post/Post.svelte';
	import Profile from '../Modules/Profile/Profile.svelte';
	import { API_URL } from '../../consts';
	import ComponentMap from '../Divs/ComponentMap.svelte';
	import FetchyError from '../Modules/FetchyError/FetchyError.svelte';
	import CardWithHeader from '../Modules/Card/CardWithHeader.svelte';
	import MiscGroup from '../Modules/Miscellaneuos/_Parts/MiscGroup.svelte';

	export let id = 0;

	let _userView = getUser(id);
</script>

<div class="[ user-view ]">
	{#await _userView}
		<LoadingBar />
	{:then userView}
		<FlexyCustom tag="header" cubeClass={{ blockClass: 'user__header' }} justify="space-between">
			<FlexyCenter useJustify={false}>
				<Profile
					props={{ src: API_URL + userView.profile, alt: userView.username + "'s profile" }}
					cubeClass={{ utilClass: 'fs-800' }}
				/>
				<p class="[ fs-500 ]">Isolated</p>
			</FlexyCenter>

			<FlexyCenter>
				<p class="[ fs-350 text-muted ]"><Numeric num={userView.honor} /> honor</p>
				<Button cubeClass={{ utilClass: 'border-radius-100vw' }} variant="primary-difference">
					+ Follow
				</Button>
			</FlexyCenter>
		</FlexyCustom>

		<div class="[ feed ] [ grid margin-top-4 margin-inline-1 ]" data-grid-collapse>
			<div class="[ posts ] [ flex-direction-column gap-2 ]">
				<ComponentMap
					_this={Post}
					items={userView.posts}
					fontSize={500}
					fallbackText={'No posts found.'}
				/>
			</div>

			<Miscellaneuos>
				<CardWithHeader
					title="Joined Communities"
					cubeClass={{ utilClass: 'padding-1' }}
					variant="difference"
				>
					<div class="[ flow ]">
						<ComponentMap
							_this={MiscGroup}
							items={userView.communities}
							otherProps={{ showJoin: false }}
							fallbackText="No communities found."
						/>
					</div>
				</CardWithHeader>
			</Miscellaneuos>
		</div>
	{:catch err}
		<FetchyError {err} />
	{/await}
</div>
