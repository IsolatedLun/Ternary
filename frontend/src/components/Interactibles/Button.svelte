<script lang="ts">
	import type { Props_CubeCSS } from '../../types';
	import { createCubeCSSClass, defCubeClass } from '../../utils/componentFuncs';

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let ariaLabel = 'button';
	export let self: HTMLElement | null = null;
	export let submit = false;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'button',
		utilClass: 'fw-bold text-center'
	});
</script>

<button
	on:click
	bind:this={self}
	class={_class}
	data-variant={variant}
	data-secondary-variant={secondaryVariant}
	type={submit ? 'submit' : 'button'}
	aria-label={ariaLabel}
>
	<slot />
</button>
