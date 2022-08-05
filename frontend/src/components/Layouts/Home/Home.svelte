<script lang="ts">
	import Miscellaneuos from '../../Modules/Miscellaneuos/Miscellaneuos.svelte';
	import { getFeed } from '../../../services/postFetchers';
	import CardWithHeader from '../../Modules/Card/CardWithHeader.svelte';
	import MiscGroup from '../../../components/Modules/Miscellaneuos/_Parts/MiscGroup.svelte';
	import Post from '../../Modules/Post/Post.svelte';
	import HomeHeader from './_Parts/HomeHeader.svelte';
	import { getRelevantCommunities } from '../../../services/communityFetchers';
	import LoadingBar from '../../../components/Modules/Bars/LoadingBar.svelte';
	import ComponentMap from '../../../components/Divs/ComponentMap.svelte';

	const feedPromise = getFeed();
	const communitiesPromise = getRelevantCommunities();
</script>

<div class="[ feed ] [ grid ]" data-grid-collapse>
	<div class="[ flex-direction-column gap-1 ]">
		<HomeHeader />
		<section class="[ posts ] [ flex-direction-column gap-2 ] [ width-100 ]">
			{#await feedPromise}
				<LoadingBar />
			{:then feed}
				<ComponentMap
					_this={Post}
					items={feed}
					fontSize={500}
					fallbackText="No posts found, maybe join some communities!"
				/>
			{/await}
		</section>
	</div>

	<Miscellaneuos>
		<CardWithHeader
			title="Relevant Communities"
			cubeClass={{ utilClass: 'padding-1' }}
			variant="difference"
		>
			<div class="[ flow ]">
				{#await communitiesPromise}
					<LoadingBar />
				{:then communities}
					<ComponentMap
						_this={MiscGroup}
						items={communities}
						fallbackText="No relevant communities found"
					/>
				{/await}
			</div>
		</CardWithHeader>

		<CardWithHeader
			title="Related Posts"
			cubeClass={{ utilClass: 'padding-1' }}
			variant="difference"
		/>
	</Miscellaneuos>
</div>
