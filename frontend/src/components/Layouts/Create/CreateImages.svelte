<script lang="ts">
	import ImageInput from '../../../components/Interactibles/Input/ImageInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../../components/Interactibles/Button.svelte';
	import { isImageLoop } from '../../../utils/inputValidators';

	function addImage(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.files && isImageLoop(target)) {
			images = [...images, ...(<any>target.files)];
			handleImageUploads(<any>images);
		}
	}

	function removeImage(e: CustomEvent) {
		const name = e.detail.name as string;

		images = [...images.filter((file) => file.name !== name)];
		handleImageUploads(images);
	}

	function handleImageUploads(files: File[]) {
		dispatch('input', { images: files });
	}

	const dispatch = createEventDispatcher();
	let inputs = 0;
	let images: File[] = [];
</script>

<div class="[ flex flex-wrap align-items-center gap-1 ]">
	{#each { length: inputs } as _, i}
		<ImageInput on:input={addImage} on:remove={removeImage} deleteable={true} />
	{/each}
	<Button variant="primary" on:click={() => inputs++}>Add image</Button>
</div>
