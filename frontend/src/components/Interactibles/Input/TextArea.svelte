<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import { onMount } from 'svelte';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { runValidators } from './_funcs';
	import type { Props_InputValidator } from 'src/utils/types';
	import { createEventDispatcher } from 'svelte';

	onMount(() => {
		_this.addEventListener('input', (e) => {
			errors = runValidators(e, validators);
		});

		errors = runValidators(_this.value, validators);
		handleErrors(errors);
	});

	function handleErrors(errors: string[]) {
		if (errors.length > 0) dispatch('error', { amount: errors.length });
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let validators: Props_InputValidator[] = [];
	export let label = '';

	export let useColumn = true;
	export let useAlign = false;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'input'
	});
	const dispatch = createEventDispatcher();
	let _this: HTMLTextAreaElement;
	let errors: string[] = [];
</script>

<FlexyCenter
	cubeClass={{ blockClass: 'input-container', utilClass: 'width-100' }}
	{useColumn}
	{useAlign}
	props={{ gap: 1 }}
>
	{#if label.length > 0}
		<label for="">{label}</label>
	{/if}
	<textarea
		on:input
		class={_class}
		bind:this={_this}
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
		data-input-type="textarea"
	/>

	{#if errors.length > 0}
		<ul class="[ margin-inline-start-2 ]">
			{#each errors as error (error)}
				<li class="[ clr-downvote-400 ]">{error}</li>
			{/each}
		</ul>
	{/if}
</FlexyCenter>
