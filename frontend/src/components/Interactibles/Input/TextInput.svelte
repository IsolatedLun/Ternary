<script lang="ts">
	import FlexyCenter from '../../../components/Divs/FlexyCenter.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import { runValidators } from './_funcs';
	import type { Props_InputValidator } from 'src/utils/types';

	onMount(() => {
		_this.addEventListener('input', (e) => {
			errors = runValidators(e.target as HTMLInputElement, validators);
		});

		errors = runValidators(_this, validators);
	});

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let validators: Props_InputValidator[] = [];
	export let label = '';
	export let value = '';
	export let type: 'text' | 'email' | 'password' = 'text';
	export let thenOnInput: Function | null = null;

	export let useColumn = true;
	export let useAlign = false;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'input'
	});
	let _this: HTMLInputElement;
	let errors: string[] = [];
	const dispatch = createEventDispatcher();
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
	<input
		on:input={(e) => {
			value = _this.value;
			if (thenOnInput) thenOnInput(e);
		}}
		on:click
		bind:this={_this}
		bind:value
		use:setType
		class={_class}
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
	/>

	{#if errors.length > 0}
		<ul class="[ margin-inline-start-2 ]">
			{#each errors as error (error)}
				<li class="[ clr-downvote-400 ]">{error}</li>
			{/each}
		</ul>
	{/if}
</FlexyCenter>
