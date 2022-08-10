<script lang="ts">
	import Image from '../../../components/Modules/MediaElements/Image.svelte';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_IMAGE, ICON_TRASH } from '../../../consts';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { rand } from '../../../utils/generalFuncs';
	import Button from '../Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { isImage } from '../../../utils/inputValidators';

	onMount(() => {
		_thisInput.addEventListener('input', handleInput);

		_thisLabel.setAttribute('data-input-valid', 'false');
	});

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (target.files && isImage(target.files[0])) {
			previewUrl = URL.createObjectURL(target.files[0]);

			_thisLabel.setAttribute('data-input-valid', 'true');
		} else {
			_thisLabel.setAttribute('data-input-valid', 'false');
		}
	}

	function handleDestroy() {
		if (_thisInput.files && _thisInput.files[0])
			dispatch('_remove', { name: _thisInput.files[0].name });
		_this.remove();
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let deleteable = false;
	export let label = '';
	export let secondaryVariant = 'default';

	const _class = createCubeCSSClass(cubeClass, {
		blockClass: 'create__image-preview',
		compostClass: 'input',
		utilClass: 'cursor-pointer grid place-items-center text-muted padding-1 pos-relative'
	});
	const dispatch = createEventDispatcher();

	let id = 'image-input-' + rand(1000);
	let previewUrl: string = '';

	let _this: HTMLElement;
	let _thisLabel: HTMLElement;
	let _thisInput: HTMLInputElement;
</script>

<div class="input-container" bind:this={_this}>
	<div class="[ flex gap-1 align-items-start ]">
		<div class="[ flow ]">
			{#if label}
				<p>{label}</p>
			{/if}
			<label
				for={id}
				class={_class}
				bind:this={_thisLabel}
				data-variant="media-image"
				data-secondary-variant={secondaryVariant}
			>
				{#if previewUrl.length === 0}
					<Icon cubeClass={{ utilClass: 'pos-absolute' }}>{ICON_IMAGE}</Icon>
				{/if}
				<Image props={{ src: previewUrl, alt: '' }} />
			</label>
		</div>
		{#if deleteable}
			<Button variant="icon-block" secondaryVariant="downvote" on:click={handleDestroy}>
				<Icon>{ICON_TRASH}</Icon>
			</Button>
		{/if}
	</div>

	<input
		{id}
		type="file"
		accept="image/*"
		data-hide="true"
		bind:this={_thisInput}
		on:input
		data-input-valid="false"
	/>
</div>
