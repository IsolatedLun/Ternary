<script lang="ts">
	import Miscellaneuos from '../../Modules/Miscellaneuos/Miscellaneuos.svelte';
	import { getFeed } from '../../../services/postFetchers';
	import Card from '../../Modules/Card/Card.svelte';
	import MiscGroup from '../../../components/Modules/Miscellaneuos/_Parts/MiscGroup.svelte';
	import Post from '../../Modules/Post/Post.svelte';
	import HomeHeader from './_Parts/HomeHeader.svelte';
	import { getRelevantCommunities } from '../../../services/communityFetchers';

	const feedPromise = getFeed();
	const communitiesPromise = getRelevantCommunities();
</script>

<div class="[ feed ] [ grid ]" data-grid-collapse>
	<div class="[ flex-direction-column gap-1 ]">
		<HomeHeader />
		<section class="[ posts ] [ flex-direction-column gap-2 ] [ width-100 ]">
			{#await feedPromise}
				<p>LOADING</p>
			{:then feed}
				{#each feed as post}
					<Post props={{ ...post }} />
				{/each}
			{/await}
		</section>
	</div>

	<Miscellaneuos>
		<Card cubeClass={{ utilClass: 'padding-1' }} variant="difference">
			<p class="[ under-border ] [ text-center margin-block-end-1 ]">Relevant Communities</p>

			<div class="[ flow ]">
				{#await communitiesPromise then communities}
					{#each communities as community}
						<MiscGroup props={{ ...community }} />
					{/each}
				{/await}
			</div>
		</Card>

		<Card cubeClass={{ utilClass: 'padding-1' }} variant="difference">
			<p class="[ under-border ] [ text-center margin-block-end-1 ]">Related Posts</p>
		</Card>
	</Miscellaneuos>
</div>
