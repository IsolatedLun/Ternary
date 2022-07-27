<script lang="ts">
	import { API_URL, ICON_ARROW_LEFT, ICON_ARROW_RIGHT } from '../../../../consts';
	import Button from '../../../../components/Interactibles/Button.svelte';
	import Icon from '../../Icon/Icon.svelte';
	import Image from '../../MediaElements/Image.svelte';

	export let images: string[] = [];
	export let title = '';

	let idx = 0;
</script>

<div class="[ post__images ]">
	<Button
		on:click={() => (idx - 1 < 0 ? (idx = images.length - 1) : (idx -= 1))}
		cubeClass={{ blockClass: 'image__button', utilClass: 'pos-absolute mix-blend-difference' }}
		variant="action-difference"
		ariaLabel="Previous Image"
	>
		<Icon>{ICON_ARROW_LEFT}</Icon>
	</Button>

	<div>
		<Image props={{ src: API_URL + images[idx], alt: `${title} image ${idx}` }} />
	</div>

	<Button
		on:click={() => (idx + 1 > images.length - 1 ? (idx = 0) : (idx += 1))}
		cubeClass={{ blockClass: 'image__button', utilClass: 'pos-absolute mix-blend-difference' }}
		variant="action-difference"
		ariaLabel="Next Image"
	>
		<Icon>{ICON_ARROW_RIGHT}</Icon>
	</Button>
</div>
