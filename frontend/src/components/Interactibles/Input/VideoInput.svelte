<script lang="ts">
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_EDIT, ICON_VIDEO } from '../../../consts';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { rand } from '../../../utils/generalFuncs';
	import Button from '../Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import Video from '../../../components/Modules/MediaElements/Video.svelte';
	import { isVideo } from '../../../utils/inputValidators';

	onMount(() => {
		_thisInput.addEventListener('input', handleInput);
	});

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (target.files && isVideo(target.files[0])) {
			previewUrl = URL.createObjectURL(target.files[0]);
			dispatch('input', { video: target.files[0] });
		} else {
			previewUrl = '';
		}
	}

	function handleDestroy() {
		if (_thisInput.files && _thisInput.files[0])
			dispatch('remove', { name: _thisInput.files[0].name });
		_this.remove();
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'input',
		utilClass: 'cursor-pointer grid place-items-center text-muted padding-1 pos-relative'
	});
	const dispatch = createEventDispatcher();

	let errors: string[] = [];
	let id = 'video-input-' + rand(1000);
	let previewUrl: string = '';
	let _this: HTMLElement;
	let _thisInput: HTMLInputElement;
</script>

<div class="input-container" bind:this={_this}>
	<div class="[ flex gap-1 align-items-start ]">
		<label for={id} class={_class} data-variant="media-video">
			{#if previewUrl.length === 0}
				<Icon cubeClass={{ utilClass: 'pos-absolute' }}>{ICON_VIDEO}</Icon>
			{:else}
				<Video props={{ src: previewUrl }} />
			{/if}
		</label>

		{#if previewUrl.length > 0}
			<Button on:click={() => _thisInput.click()} variant="icon-block" secondaryVariant="upvote"
				><Icon>{ICON_EDIT}</Icon></Button
			>
		{/if}
	</div>

	<input
		{id}
		type="file"
		accept="video/*"
		data-hide="true"
		data-input-valid={true}
		bind:this={_thisInput}
		on:input={handleInput}
	/>
</div>
