<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import { onMount } from 'svelte';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { runValidators } from './_funcs';

	onMount(() => {
		_this.addEventListener('input', (e) => {
			errors = runValidators(e, validators);
		});
		errors = runValidators(_this.value, validators);
	});

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let validators: Function[] = [];

	export let useColumn = true;
	export let useAlign = false;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'input'
	});
	let _this: HTMLTextAreaElement;
	let errors: string[] = [];
</script>

<FlexyCenter
	cubeClass={{ blockClass: 'input-container', utilClass: 'width-100' }}
	{useColumn}
	{useAlign}
	props={{ gap: 1 }}
>
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
