<script>
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Button from '../../../components/Interactibles/Button.svelte';
	import Image from '../../../components/Modules/MediaElements/Image.svelte';
	import { getCommunity } from '../../../services/communityFetchers';
	import { API_URL, POST_SELECT_VALUES } from '../../../consts';
	import Miscellaneuos from '../../../components/Modules/Miscellaneuos/Miscellaneuos.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Select from '../../../components/Modules/Dropdown/Select.svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';

	export let id = -1;
	let communityPromise = getCommunity(id);
</script>

{#await communityPromise then community}
	<section class="community">
		<header class="[ community__header ]">
			<div class="[ community__banner ]">
				<Image
					cubeClass={{ utilClass: 'border-radius-cubed' }}
					props={{ src: API_URL + community.banner, alt: `${community.name} Community banner.` }}
				/>
			</div>
			<Card
				variant="difference"
				cubeClass={{
					blockClass: 'community__navbar',
					utilClass: 'padding-1 margin-block-start-1 padding-inline-3'
				}}
			>
				<div class="[ flex align-items-center justify-content-space-between ]">
					<h2>{community.name}</h2>
					<Button variant="primary-difference">Join</Button>
				</div>
			</Card>
		</header>

		<div class="[ feed ] [ grid margin-block-start-2 ]">
			<div>
				<Card variant="difference" cubeClass={{ utilClass: 'padding-1' }}>
					<FlexyCustom align="center" justify="space-between" gap={3}>
						<TextInput placeholder="Search posts" />
						<Select selectText="Sort by" options={POST_SELECT_VALUES} />
					</FlexyCustom>
				</Card>
			</div>
			<Miscellaneuos>
				<p>misc</p>
			</Miscellaneuos>
		</div>
	</section>
{/await}
