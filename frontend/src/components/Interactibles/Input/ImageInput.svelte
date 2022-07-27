<script lang="ts">
	import Image from '../../../components/Modules/MediaElements/Image.svelte';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_IMAGE, ICON_TRASH } from '../../../consts';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { rand } from '../../../utils/generalFuncs';
	import Button from '../Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	onMount(() => {
		_thisInput.addEventListener('input', handleInput);
	});

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (target.files) previewUrl = URL.createObjectURL(target.files[0]);
	}

	function handleDestroy() {
		if (_thisInput.files && _thisInput.files[0])
			dispatch('remove', { name: _thisInput.files[0].name });
		_this.remove();
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();

	const _class = createCubeCSSClass(cubeClass, {
		blockClass: 'create__image-preview',
		compostClass: 'input',
		utilClass: 'cursor-pointer grid place-items-center text-muted padding-1 pos-relative'
	});
	const dispatch = createEventDispatcher();

	let errors: string[] = [];
	let id = 'file-input-' + rand(1000);
	let previewUrl: string = '';
	let _this: HTMLElement;
	let _thisInput: HTMLInputElement;
</script>

<div class="input-container" bind:this={_this}>
	<div class="[ flex gap-1 align-items-starts ]">
		<label for={id} class={_class} data-variant="media-image">
			{#if previewUrl.length === 0}
				<Icon cubeClass={{ utilClass: 'pos-absolute' }}>{ICON_IMAGE}</Icon>
			{/if}
			<Image props={{ src: previewUrl, alt: '' }} />
		</label>
		<Button variant="icon-block" secondaryVariant="downvote" on:click={handleDestroy}>
			<Icon>{ICON_TRASH}</Icon>
		</Button>
	</div>

	<input {id} type="file" accept="image/*" data-hide="true" bind:this={_thisInput} on:input />
</div>
