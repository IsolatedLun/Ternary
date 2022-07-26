<script lang="ts">
	import Image from '../../../components/Modules/MediaElements/Image.svelte';
	import MediaInput from '../../../components/Interactibles/Input/MediaInput.svelte';
	import { imageValidator, isImageLoop } from '../../../utils/inputValidators';

	let images: File[] = [];
	function addImage(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.files && isImageLoop(target)) images = [...images, ...(<any>target.files)];
	}

	function removeImage(idx: number) {
		images.splice(idx, 1);

		images = [...images];
	}
</script>

<div class="[ flex flex-wrap align-items-center gap-1 ]">
	{#each images as image, idx (image.name + idx)}
		<button
			on:click={() => removeImage(idx)}
			class="[ create__image-preview ] [ card hoverable ] [ padding-1 border-radius-cubed cursor-pointer ]"
		>
			<Image props={{ src: URL.createObjectURL(image), alt: '' }} />
		</button>
	{/each}
	<MediaInput
		on:input={addImage}
		validators={[imageValidator()]}
		cubeClass={{ utilClass: 'margin-inline-end-auto' }}
		type="image"
		variant="primary"
	/>
</div>
