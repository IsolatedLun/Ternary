<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { runValidators } from './_funcs';
	import type { Props_InputValidator } from 'src/utils/types';
	import { rand } from '../../../utils/generalFuncs';

	onMount(() => {
		_this.addEventListener('input', (e) => {
			errors = runValidators(e.target as HTMLInputElement, validators);
			handleErrors(errors);
		});

		errors = runValidators(_this as HTMLInputElement, validators);
		handleErrors(errors);
	});

	function handleErrors(errors: string[]) {
		if (errors.length > 0) dispatch('error', { amount: errors.length });
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let validators: Props_InputValidator[] = [];
	export let variant = '';
	export let type = '';

	export let useColumn = true;
	export let useAlign = false;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: type === 'image' ? 'button' : 'input',
		utilClass: type === 'video' ? 'grid place-items-center text-muted cursor-pointer' : ''
	});
	const dispatch = createEventDispatcher();

	let _this: HTMLInputElement;
	let errors: string[] = [];
	let id = 'file-input-' + rand(1000);
</script>

<FlexyCenter
	cubeClass={{ blockClass: 'input-container', utilClass: 'pos-relative width-100' }}
	{useColumn}
	{useAlign}
	props={{ gap: 1 }}
>
	<label class={_class} for={id} data-variant={type === 'image' ? variant : 'media-video'}>
		<p>Add Media</p>
	</label>
	<input
		on:input
		on:click
		{id}
		data-variant={variant}
		data-hide={true}
		type="file"
		accept={type + '/*'}
		multiple={type === 'video' ? false : true}
	/>

	{#if errors.length > 0}
		<ul class="[ margin-inline-start-2 ]">
			{#each errors as error (error)}
				<li class="[ clr-downvote-400 ]">{error}</li>
			{/each}
		</ul>
	{/if}
</FlexyCenter>
