<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Button from '../../../components/Interactibles/Button.svelte';
	import Image from '../../../components/Modules/MediaElements/Image.svelte';
	import { getCommunity, getTopMembers, joinCommunity } from '../../../services/communityFetchers';
	import { API_URL, POST_SELECT_VALUES } from '../../../consts';
	import Miscellaneuos from '../../../components/Modules/Miscellaneuos/Miscellaneuos.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Select from '../../../components/Modules/Dropdown/Select.svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import CardWithHeader from '../../../components/Modules/Card/CardWithHeader.svelte';
	import Numeric from '../../../components/Modules/Numeric/Numeric.svelte';
	import CreatePostDecor from '../../../components/Modules/CreatePostDecor/CreatePostDecor.svelte';
	import Post from '../../../components/Modules/Post/Post.svelte';
	import UserRepr from '../../../components/Modules/User/UserRepr.svelte';
	import LoadingBar from '../../../components/Modules/Bars/LoadingBar.svelte';
	import Profile from '../../../components/Modules/Profile/Profile.svelte';
	import type { Props_Post } from 'src/components/Modules/Post/types';

	async function handleCommunityPromise() {
		community = await getCommunity(id);
	}

	function handleJoin() {
		joinCommunity(community.id).then((res) => {
			community.joined = res;

			if (!res) {
				community.members--;
				res = false;
			} else {
				community.members++;
				res = true;
			}
		});
	}

	export let id = -1;

	let community: import('./types').Props_Community<Props_Post<number, any>[], number>;
	let topCommunityMembersPromise = getTopMembers(id);
</script>

{#await handleCommunityPromise()}
	<LoadingBar />
{:then _}
	<section class="[ community ]">
		<header class="[ community__header ] [ card ] [ [ padding-1 ]" data-variant="difference">
			<div class="[ community__banner ]">
				<Image
					cubeClass={{ utilClass: 'border-radius-cubed' }}
					props={{ src: API_URL + community.banner, alt: `${community.name} Community banner.` }}
				/>
			</div>
			<div class="[ margin-block-start-2 margin-block-end-1 margin-inline-5 ]">
				<FlexyCustom align="center" justify="space-between">
					<FlexyCustom align="center" gap={2}>
						<Profile props={{ src: API_URL + community.profile, alt: '' }} />
						<h2 class="[ fw-normal ]">{community.name}</h2>
					</FlexyCustom>
					<FlexyCenter>
						<p class="[ text-muted fs-300 ]"><Numeric num={community.members} /> members</p>
						{#if community.joined}
							<Button variant="red-difference" on:click={handleJoin}>Leave</Button>
						{:else}
							<Button variant="primary-difference" on:click={handleJoin}>Join</Button>
						{/if}
					</FlexyCenter>
				</FlexyCustom>
			</div>
		</header>

		<div class="[ feed ] [ grid margin-block-start-2 ]" data-grid-collapse>
			<div class="[ flow ]">
				<CreatePostDecor
					communityId={community.id}
					communityName={community.name}
					communityProfile={community.profile}
				/>
				<Card variant="difference" cubeClass={{ utilClass: 'padding-1 margin-block-end-3' }}>
					<FlexyCustom align="center" justify="space-between" gap={3}>
						<TextInput placeholder="Search posts" variant="primary" />
						<Select selectText="Sort by" defaultSelected={'Hot'} options={POST_SELECT_VALUES} />
					</FlexyCustom>
				</Card>

				<div class=" [ posts ] [ flex-direction-column gap-2 ]">
					{#each community.posts as post}
						<Post props={{ ...post }} />
					{/each}
				</div>
			</div>
			<Miscellaneuos>
				<CardWithHeader
					title="Top members"
					variant="difference"
					cubeClass={{ utilClass: 'padding-1' }}
				>
					<div class="[ grid ] [ place-items-center gap-2 ]">
						{#await topCommunityMembersPromise then topMembers}
							{#each topMembers as topMember}
								<UserRepr {...topMember} />
							{/each}
						{/await}
					</div>
				</CardWithHeader>
			</Miscellaneuos>
		</div>
	</section>
{/await}
